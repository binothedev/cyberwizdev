// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Users, Mail, MessageSquare, Send, Database, FileDown, Loader2 } from "lucide-react";

interface DbResult {
  migrations?: unknown[];
  seeds?: unknown[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    subscribers: 0,
    contacts: 0,
    chatSessions: 0,
    newsletters: 0,
  });
  const [dbBusy, setDbBusy] = useState<"migrate" | "seed" | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [subscribersRes, contactsRes, chatsRes] = await Promise.all([
        fetch("/api/admin/subscribers"),
        fetch("/api/admin/contacts"),
        fetch("/api/admin/chat/sessions"),
      ]);

      const subscribersData = await subscribersRes.json();
      const contactsData = await contactsRes.json();
      const chatsData = await chatsRes.json();

      setStats({
        subscribers: subscribersData.subscribers?.length || 0,
        contacts: contactsData.contacts?.length || 0,
        chatSessions: chatsData.sessions?.filter((s: any) => s.status === "active").length || 0,
        newsletters: 0, // You can add this if you create an endpoint
      });
    } catch (error) {
      console.error("Failed to fetch stats");
    }
  };

  const runDbAction = async (action: "migrate" | "seed") => {
    setDbBusy(action);
    try {
      const res = await fetch("/api/admin/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = (await res.json()) as {
        result?: DbResult;
        error?: string;
      };
      if (!res.ok) {
        toast.error(data.error || `${action} failed`);
        return;
      }
      const items = action === "migrate" ? data.result?.migrations : data.result?.seeds;
      const count = Array.isArray(items) ? items.length : 0;
      toast.success(
        action === "migrate"
          ? `Migrations complete (${count} applied)`
          : `Seed complete (${count} files)`
      );
      fetchStats();
    } catch (error) {
      toast.error("Database relay error — check RELAY_URL / RELAY_SECRET");
      console.error("DB action error:", error);
    } finally {
      setDbBusy(null);
    }
  };

  const statCards = [
    {
      title: "Total Subscribers",
      value: stats.subscribers,
      icon: Users,
      description: "Newsletter subscribers",
      color: "text-primary",
    },
    {
      title: "Contact Submissions",
      value: stats.contacts,
      icon: Mail,
      description: "Total form submissions",
      color: "text-green-600",
    },
    {
      title: "Active Chats",
      value: stats.chatSessions,
      icon: MessageSquare,
      description: "Live chat sessions",
      color: "text-secondary",
    },
    {
      title: "Newsletters Sent",
      value: stats.newsletters,
      icon: Send,
      description: "Campaign count",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your site.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/newsletter"
              className="block p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <Send className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Send Newsletter</p>
                  <p className="text-sm text-muted-foreground">Create and send email campaigns</p>
                </div>
              </div>
            </a>
            <a
              href="/admin/chat"
              className="block p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">View Live Chats</p>
                  <p className="text-sm text-muted-foreground">Respond to customer inquiries</p>
                </div>
              </div>
            </a>
            <a
              href="/admin/contacts"
              className="block p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Review Contacts</p>
                  <p className="text-sm text-muted-foreground">Check contact form submissions</p>
                </div>
              </div>
            </a>
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button
                onClick={() => runDbAction("migrate")}
                disabled={dbBusy !== null}
                variant="outline"
                className="flex-1"
              >
                {dbBusy === "migrate" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Database className="h-4 w-4" />
                )}
                Run Migrations
              </Button>
              <Button
                onClick={() => runDbAction("seed")}
                disabled={dbBusy !== null}
                variant="outline"
                className="flex-1"
              >
                {dbBusy === "seed" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileDown className="h-4 w-4" />
                )}
                Run Seeds
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New subscriber joined</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Contact form submitted</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 bg-secondary rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New chat session started</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}