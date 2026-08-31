"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";
import { toast } from "react-hot-toast";

// WebSocket (socket.io) is COMMENTED OUT — the chat now refreshes via
// HTTP polling every 3 seconds. To re-enable websockets, uncomment the
// socket.io imports + initSocket() usage below and remove the polling.
// import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  message: string;
  sender: "user" | "admin";
  senderName?: string | null;
  createdAt: string;
}

const POLL_INTERVAL_MS = 3000;

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string>("");
  const [userName, setUserName] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>("");
  // const socketRef = useRef<Socket | null>(null);

  // Get WebSocket URL from environment variable (kept for when websockets are re-enabled)
  // const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "http://localhost:3001";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Restore an existing session from localStorage.
  useEffect(() => {
    const storedSessionId = localStorage.getItem("chatSessionId");
    if (storedSessionId) {
      setSessionId(storedSessionId);
      sessionIdRef.current = storedSessionId;
      setIsStarted(true);
      fetchMessages(storedSessionId);
    }
    // Websocket version: initSocket(storedSessionId);
    // return () => socketRef.current?.disconnect();
  }, []);

  // Poll for new messages every 3 seconds while the chat is open & started.
  useEffect(() => {
    if (!isOpen || !isStarted) return;

    const interval = setInterval(() => {
      const sid = sessionIdRef.current;
      if (sid) fetchMessages(sid);
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isOpen, isStarted]);

  /*
   * WebSocket implementation (commented out — replaced by polling above).
   *
  const initSocket = (sid: string) => {
    socketRef.current?.disconnect();

    const socket = io(WEBSOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join-chat", sid);
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("chat-history", (chatMessages: Message[]) =>
      setMessages(chatMessages)
    );

    socket.on("new-message", (newMessage: Message) => {
      // Only add admin messages (user messages are already added optimistically)
      if (newMessage.sender === "admin") {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    socket.on("error", (err: { message: string }) => {
      toast.error(err.message || "Connection error");
    });
  };
  */

  const fetchMessages = useCallback(async (sid: string) => {
    try {
      const res = await fetch(`/api/chat/messages?sessionId=${sid}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch {
      console.error("Failed to fetch messages");
    }
  }, []);

  const startChat = useCallback(async () => {
    if (!userName.trim()) return toast.error("Please enter your name");

    try {
      const res = await fetch("/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName }),
      });
      const data = await res.json();
      setSessionId(data.sessionId);
      sessionIdRef.current = data.sessionId;
      localStorage.setItem("chatSessionId", data.sessionId);
      setIsStarted(true);
      // Websocket version: initSocket(data.sessionId);
      toast.success("Chat started!");
    } catch {
      toast.error("Failed to start chat");
    }
  }, [userName]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || !sessionId) return;

    const message: Message = {
      id: Date.now().toString(),
      message: input,
      sender: "user",
      senderName: userName,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: message.message, userName }),
      });
      const data = await res.json();
      if (!data.success) throw new Error("Send failed");
      // Refresh from server to pick up the persisted message + any admin replies.
      await fetchMessages(sessionId);
    } catch {
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  }, [input, sessionId, userName, fetchMessages]);

  return (
    <>
      {/* Floating toggle button */}
      {!isOpen && (
        <Button
          aria-label="Open live chat"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-[#3498db] hover:bg-[#2980b9] text-white"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[calc(100vw-3rem)] max-w-96 h-[500px] max-h-[calc(100vh-3rem)] shadow-2xl z-50 flex flex-col bg-white">
          <div className="bg-[#3498db] text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-xs opacity-90">We typically reply in minutes</p>
              </div>
            </div>
            <Button
              aria-label="Close chat"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {!isStarted ? (
            <div className="flex-1 p-6 flex flex-col justify-center">
              <h4 className="font-semibold text-lg mb-2">Start a conversation</h4>
              <p className="text-sm text-gray-500 mb-4">
                Enter your name to begin chatting
              </p>
              <Input
                placeholder="Your name..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && startChat()}
                className="mb-4"
              />
              <Button onClick={startChat} className="w-full bg-[#3498db] hover:bg-[#2980b9]">
                Start Chat
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="h-full flex items-center justify-center text-sm text-gray-500">
                    No messages yet — say hello!
                  </div>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    } animate-fadeIn`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg px-4 py-2 ${
                        msg.sender === "user"
                          ? "bg-[#3498db] text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {msg.sender === "admin" && msg.senderName && (
                        <p className="text-xs font-semibold mb-1">
                          {msg.senderName}
                        </p>
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

              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    disabled={isSending}
                  />
                  <Button
                    aria-label="Send message"
                    onClick={sendMessage}
                    size="icon"
                    disabled={isSending}
                    className="bg-[#3498db] hover:bg-[#2980b9]"
                  >
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
