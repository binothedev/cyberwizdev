// app/admin/chat/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";
import { Send, RefreshCw, MessageSquare, ArrowLeft } from "lucide-react";

interface ChatSession {
  id: string;
  userName: string | null;
  userEmail: string | null;
  status: string;
  lastMessage: string | null;
  createdAt: string;
  updatedAt: string;
  unread?: boolean;
}

interface Message {
  id: string;
  message: string;
  sender: string;
  senderName: string | null;
  createdAt: string;
  sessionId?: string;
}

// Poll interval for message "hot reload" (websockets are commented out).
const POLL_INTERVAL_MS = 3000;

export default function AdminChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [adminName] = useState("Admin");
  const [isSending, setIsSending] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const selectedSessionRef = useRef<ChatSession | null>(null);

  // keep ref in sync with state
  useEffect(() => {
    selectedSessionRef.current = selectedSession;
  }, [selectedSession]);

  useEffect(() => {
    fetchSessions();

    return () => {};
  }, []);

  useEffect(() => {
    if (selectedSession) {
      fetchMessages(selectedSession.id);
      setSessions((prev) =>
        prev.map((s) =>
          s.id === selectedSession.id ? { ...s, unread: false } : s
        )
      );
    }
  }, [selectedSession?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Poll: refresh sessions + messages every 3s (replaces websocket hot reload).
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSessions();
      const current = selectedSessionRef.current;
      if (current) {
        fetchMessages(current.id);
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/chat/sessions");
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch {
      console.error("Failed to fetch sessions");
    }
  }, []);

  const fetchMessages = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/admin/chat/messages?sessionId=${sessionId}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch {
      console.error("Failed to fetch messages");
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !selectedSession) return;

    const message = input.trim();
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/admin/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selectedSession.id,
          message,
          senderName: adminName,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to send");
      }
      await fetchMessages(selectedSession.id);
      await fetchSessions();
    } catch (error) {
      toast.error("Failed to send message");
      console.error(error);
    } finally {
      setIsSending(false);
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
        setMobileView("list");
      }
    } catch {
      toast.error("Failed to close session");
    }
  };

  const selectSession = (session: ChatSession) => {
    setSelectedSession(session);
    setMobileView("chat");
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Live Chat</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm md:text-base">
            Chat with website visitors in real-time
          </p>
        </div>
        <Button
          onClick={fetchSessions}
          variant="outline"
          className="gap-2 self-start sm:self-auto"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* layout */}
      <div className="grid lg:grid-cols-3 gap-4 md:gap-6 h-[calc(100vh-220px)] min-h-[480px]">
        {/* Sessions list — hidden on mobile when a chat is open */}
        <Card
          className={`lg:col-span-1 overflow-hidden flex flex-col ${
            mobileView === "chat" ? "hidden lg:flex" : "flex"
          }`}
        >
          <CardHeader>
            <CardTitle className="text-lg">
              Active Chats ({sessions.filter((s) => s.status === "active").length})
            </CardTitle>
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
                    onClick={() => selectSession(session)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      selectedSession?.id === session.id
                        ? "bg-gray-100 dark:bg-gray-800"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate flex items-center gap-2">
                          {session.userName || "Anonymous"}
                          {session.unread && (
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          )}
                        </p>
                        {session.userEmail && (
                          <p className="text-xs text-gray-500 truncate">
                            {session.userEmail}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                          {session.lastMessage || "No messages yet"}
                        </p>
                      </div>
                      <Badge
                        variant={
                          session.status === "active" ? "default" : "secondary"
                        }
                      >
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

        {/* Chat window */}
        <Card
          className={`lg:col-span-2 overflow-hidden flex flex-col ${
            mobileView === "list" ? "hidden lg:flex" : "flex"
          }`}
        >
          {selectedSession ? (
            <>
              <CardHeader className="border-b border-gray-200 dark:border-gray-700 py-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden shrink-0"
                      onClick={() => setMobileView("list")}
                      aria-label="Back to sessions"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="min-w-0">
                      <CardTitle className="text-base md:text-lg truncate">
                        {selectedSession.userName || "Anonymous User"}
                      </CardTitle>
                      {selectedSession.userEmail && (
                        <p className="text-xs md:text-sm text-gray-500 truncate">
                          {selectedSession.userEmail}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => closeSession(selectedSession.id)}
                    className="shrink-0"
                  >
                    Close Chat
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                    No messages yet — say hello!
                  </div>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "admin" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg px-4 py-2 ${
                        msg.sender === "admin"
                          ? "bg-blue-700 text-primary-foreground"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      {msg.senderName && (
                        <p className="text-xs font-semibold mb-1">
                          {msg.senderName}
                        </p>
                      )}
                      <p className="text-sm whitespace-pre-wrap">
                        {msg.message}
                      </p>
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

              <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    disabled={isSending}
                  />
                  <Button
                    onClick={sendMessage}
                    size="icon"
                    disabled={isSending}
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 flex-col gap-2 p-6 text-center">
              <MessageSquare className="h-8 w-8 text-gray-300" />
              <p>Select a chat session to view messages</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
