// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, MessageSquare, Send } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    subscribers: 0,
    contacts: 0,
    chatSessions: 0,
    newsletters: 0,
  });

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

  const statCards = [
    {
      title: "Total Subscribers",
      value: stats.subscribers,
      icon: Users,
      description: "Newsletter subscribers",
      color: "text-blue-600",
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
      color: "text-purple-600",
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
        <p className="text-gray-500 dark:text-gray-400 mt-2">
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
              className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Send className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Send Newsletter</p>
                  <p className="text-sm text-gray-500">Create and send email campaigns</p>
                </div>
              </div>
            </a>
            <a
              href="/admin/chat"
              className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">View Live Chats</p>
                  <p className="text-sm text-gray-500">Respond to customer inquiries</p>
                </div>
              </div>
            </a>
            <a
              href="/admin/contacts"
              className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Review Contacts</p>
                  <p className="text-sm text-gray-500">Check contact form submissions</p>
                </div>
              </div>
            </a>
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
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Contact form submitted</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">New chat session started</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}