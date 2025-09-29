import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIO, WebSocketChatServer } from "@/lib/websocket-server";

// Store server instance for external access
let serverInstance: any = null;

export function getServer() {
  return serverInstance;
}

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/chat/socket",
      cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:3000"],
        methods: ["GET", "POST"],
      },
    });
    
    // Initialize WebSocket chat server
    const chatServer = new WebSocketChatServer(io);
    
    res.socket.server.io = io;
    serverInstance = { io, chatServer };
  }
  
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
