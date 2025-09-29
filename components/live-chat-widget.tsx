// components/live-chat-widget.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  message: string;
  sender: string;
  senderName: string | null;
  createdAt: string;
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string>("");
  const [userName, setUserName] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const storedSessionId = localStorage.getItem("chatSessionId");
    if (storedSessionId) {
      setSessionId(storedSessionId);
      setIsStarted(true);
      initializeSocket(storedSessionId);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeSocket = (sid: string) => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    // Initialize socket connection
    socketRef.current = io(process.env.NODE_ENV === "production" ? "" : "http://localhost:3000", {
      path: "/api/chat/socket",
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      setIsConnected(true);
      // Join the chat session
      socket.emit("join-chat", sid);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      setIsConnected(false);
    });

    socket.on("chat-history", (chatMessages: Message[]) => {
      setMessages(chatMessages);
    });

    socket.on("new-message", (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on("error", (error: { message: string }) => {
      console.error("WebSocket error:", error);
      toast.error(error.message || "Connection error");
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startChat = async () => {
    if (!userName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    try {
      const res = await fetch("/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName }),
      });
      const data = await res.json();
      setSessionId(data.sessionId);
      localStorage.setItem("chatSessionId", data.sessionId);
      setIsStarted(true);
      initializeSocket(data.sessionId);
      toast.success("Chat started! We'll respond shortly.");
    } catch (error) {
      toast.error("Failed to start chat");
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !socketRef.current || !isConnected) return;

    const tempMessage = {
      id: Date.now().toString(),
      message: input,
      sender: "user",
      senderName: userName,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMessage]);
    setInput("");

    try {
      // Send message via WebSocket
      socketRef.current.emit("send-message", {
        sessionId,
        message: input,
        userName,
      });
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          <div className="bg-primary text-gray-800 p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-xs opacity-90 flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></span>
                  {isConnected ? 'Connected' : 'Connecting...'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:bg-gray-800/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {!isStarted ? (
            <div className="flex-1 p-6 flex flex-col justify-center">
              <h4 className="font-semibold text-lg mb-2">Start a conversation</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Enter your name to begin chatting with our team
              </p>
              <Input
                placeholder="Your name..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && startChat()}
                className="mb-4"
              />
              <Button onClick={startChat} className="w-full">
                Start Chat
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg px-4 py-2 ${
                        msg.sender === "user"
                          ? "bg-primary text-gray-800"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      {msg.sender === "admin" && msg.senderName && (
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
              </div>

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
          )}
        </Card>
      )}
    </>
  );
}