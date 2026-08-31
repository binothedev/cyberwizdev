// server.js - Standalone WebSocket Server
// Uses the PHP database relay instead of Prisma: this process (the chat
// server) also cannot reach MySQL on production, so all DB work goes
// through php-relay/api.php on the cPanel host.
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const httpServer = createServer(app);

const RELAY_URL = process.env.RELAY_URL;
const RELAY_SECRET = process.env.RELAY_SECRET;

if (!RELAY_URL || !RELAY_SECRET) {
  console.error('RELAY_URL and RELAY_SECRET must be set (see .env.example)');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// --- Relay client (HMAC-signed) ---
async function relay(action, body = {}) {
  const payload = JSON.stringify({
    ts: Math.floor(Date.now() / 1000),
    ...body,
  });
  const signature = crypto
    .createHmac('sha256', RELAY_SECRET)
    .update(payload)
    .digest('hex');

  const res = await fetch(`${RELAY_URL}?action=${encodeURIComponent(action)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Relay-Signature': signature,
    },
    body: payload,
  });
  const json = await res.json();
  if (!json.ok) {
    throw new Error(json.error || 'relay error');
  }
  return json;
}

// --- Tiny per-model helpers (query registry in api.php) ---
const db = {
  chatMessage: {
    findMany: async ({ where, orderBy }) => {
      const json = await relay('query', {
        query: 'chatMessage.findMany',
        params: { sessionId: where.sessionId },
      });
      return json.result.rows;
    },
    create: async ({ data }) => {
      const json = await relay('query', {
        query: 'chatMessage.create',
        params: data,
      });
      return json.result.rows[0] || data;
    },
  },
  chatSession: {
    update: async ({ where, data }) => {
      await relay('query', {
        query: 'chatSession.update',
        params: { ...data, id: where.id },
      });
    },
    findUnique: async ({ where }) => {
      const json = await relay('query', {
        query: 'chatSession.findUnique',
        params: { id: where.id },
      });
      return json.result.rows[0] || null;
    },
  },
};

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

// Active connections tracker
const activeConnections = new Map();

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join-chat', async (sessionId) => {
    try {
      socket.join(`chat:${sessionId}`);
      activeConnections.set(sessionId, socket.id);

      const messages = await db.chatMessage.findMany({
        where: { sessionId },
        orderBy: { createdAt: 'asc' },
      });

      socket.emit('chat-history', messages);
      console.log(`Client ${socket.id} joined chat session ${sessionId}`);
    } catch (error) {
      console.error('Error joining chat:', error);
      socket.emit('error', { message: 'Failed to join chat' });
    }
  });

  socket.on('join-admin', () => {
    try {
      socket.join('admin-room');
      console.log(`Admin ${socket.id} joined admin room`);
    } catch (error) {
      console.error('Error joining admin room:', error);
      socket.emit('error', { message: 'Failed to join admin room' });
    }
  });

  socket.on('send-message', async (data) => {
    try {
      const { sessionId, message, userName } = data;

      const newMessage = await db.chatMessage.create({
        data: {
          sessionId,
          message,
          sender: 'user',
          senderName: userName,
        },
      });

      await db.chatSession.update({
        where: { id: sessionId },
        data: {
          lastMessage: message,
        },
      });

      io.to(`chat:${sessionId}`).emit('new-message', newMessage);

      const session = await db.chatSession.findUnique({
        where: { id: sessionId },
      });

      if (session) {
        io.to('admin-room').emit('session-updated', {
          ...session,
          lastMessage: message,
        });
      }

      console.log(`Message sent in session ${sessionId}:`, message);
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  socket.on('admin-message', async (data) => {
    try {
      const { sessionId, message, senderName } = data;

      const newMessage = await db.chatMessage.create({
        data: {
          sessionId,
          message,
          sender: 'admin',
          senderName: senderName,
        },
      });

      await db.chatSession.update({
        where: { id: sessionId },
        data: {
          lastMessage: message,
        },
      });

      io.to(`chat:${sessionId}`).emit('new-message', newMessage);

      const session = await db.chatSession.findUnique({
        where: { id: sessionId },
      });

      if (session) {
        io.to('admin-room').emit('session-updated', {
          ...session,
          lastMessage: message,
        });
      }

      console.log(`Admin message sent in session ${sessionId}:`, message);
    } catch (error) {
      console.error('Error sending admin message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    activeConnections.forEach((socketId, sessionId) => {
      if (socketId === socket.id) {
        activeConnections.delete(sessionId);
      }
    });
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    activeConnections: activeConnections.size,
    timestamp: new Date().toISOString(),
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  httpServer.close(() => {
    console.log('HTTP server closed');
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
  console.log(`Allowed origins: ${process.env.ALLOWED_ORIGINS || 'http://localhost:3000'}`);
});
