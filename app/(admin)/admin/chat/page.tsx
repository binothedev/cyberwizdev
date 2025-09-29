// app/admin/chat/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";
import { Send, RefreshCw } from "lucide-react";
import { io, Socket } from "socket.io-client";

interface ChatSession {
  id: string;
  userName: string | null;
  userEmail: string | null;
  status: string;
  lastMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  id: string;
  message: string;
  sender: string;
  senderName: string | null;
  createdAt: string;
}

export default function AdminChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [adminName, setAdminName] = useState("Admin");
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    initializeSocket();
    fetchSessions();
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (selectedSession && socketRef.current) {
      // Join the selected chat session
      socketRef.current.emit("join-chat", selectedSession.id);
      fetchMessages(selectedSession.id);
    }
  }, [selectedSession]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    // Initialize socket connection
    socketRef.current = io(process.env.NODE_ENV === "production" ? "" : "http://localhost:3000", {
      path: "/api/chat/socket",
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Admin connected to WebSocket server");
      setIsConnected(true);
      // Admin joins a general admin room
      socket.emit("join-admin");
    });

    socket.on("disconnect", () => {
      console.log("Admin disconnected from WebSocket server");
      setIsConnected(false);
    });

    socket.on("new-session", (session: ChatSession) => {
      setSessions((prev) => {
        const exists = prev.find(s => s.id === session.id);
        if (!exists) {
          return [session, ...prev];
        }
        return prev;
      });
    });

    socket.on("session-updated", (session: ChatSession) => {
      setSessions((prev) => 
        prev.map(s => s.id === session.id ? session : s)
      );
    });

    socket.on("chat-history", (chatMessages: Message[]) => {
      setMessages(chatMessages);
    });

    socket.on("new-message", (newMessage: Message) => {
      if (selectedSession && newMessage.sender === "user") {
        setMessages((prev) => [...prev, newMessage]);
      }
      // Update session last message
      setSessions((prev) => 
        prev.map(s => 
          s.id === selectedSession?.id 
            ? { ...s, lastMessage: newMessage.message, updatedAt: newMessage.createdAt }
            : s
        )
      );
    });

    socket.on("error", (error: { message: string }) => {
      console.error("WebSocket error:", error);
      toast.error(error.message || "Connection error");
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/admin/chat/sessions");
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch (error) {
      console.error("Failed to fetch sessions");
    }
  };

  const fetchMessages = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/admin/chat/messages?sessionId=${sessionId}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Failed to fetch messages");
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedSession || !socketRef.current || !isConnected) return;

    const tempMessage = {
      id: Date.now().toString(),
      message: input,
      sender: "admin",
      senderName: adminName,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMessage]);
    setInput("");

    try {
      // Send message via WebSocket
      socketRef.current.emit("admin-message", {
        sessionId: selectedSession.id,
        message: input,
        senderName: adminName,
      });
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const closeSession = async (sessionId: string) => {
    try {
      await fetch(`/api/admin/chat/sessions/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "closed" }),
      });
      toast.success("Session closed");
      fetchSessions();
      if (selectedSession?.id === sessionId) {
        setSelectedSession(null);
      }
    } catch (error) {
      toast.error("Failed to close session");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Live Chat</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
            Chat with website visitors in real-time
            <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${isConnected ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
              <span className={`inline-block w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </p>
        </div>
        <Button onClick={fetchSessions} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
        <Card className="lg:col-span-1 overflow-hidden flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Active Chats ({sessions.filter(s => s.status === 'active').length})</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {sessions.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No active chats
                </div>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      selectedSession?.id === session.id ? "bg-gray-100 dark:bg-gray-800" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">
                          {session.userName || "Anonymous"}
                        </p>
                        {session.userEmail && (
                          <p className="text-xs text-gray-500 truncate">{session.userEmail}</p>
                        )}
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                          {session.lastMessage || "No messages yet"}
                        </p>
                      </div>
                      <Badge variant={session.status === "active" ? "default" : "secondary"}>
                        {session.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(session.updatedAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden flex flex-col">
          {selectedSession ? (
            <>
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {selectedSession.userName || "Anonymous User"}
                    </CardTitle>
                    {selectedSession.userEmail && (
                      <p className="text-sm text-gray-500">{selectedSession.userEmail}</p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => closeSession(selectedSession.id)}
                  >
                    Close Chat
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg px-4 py-2 ${
                        msg.sender === "admin"
                          ? "bg-blue-700 text-primary-foreground"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      {msg.senderName && (
                        <p className="text-xs font-semibold mb-1">{msg.senderName}</p>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button onClick={sendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a chat session to view messages
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}