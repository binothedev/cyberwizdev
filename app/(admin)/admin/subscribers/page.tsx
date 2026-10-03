// app/admin/subscribers/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-hot-toast";
import { Trash2, Download, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Subscriber {
  id: string;
  email: string;
  status: string;
  createdAt: string;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/admin/subscribers");
      const data = await res.json();
      setSubscribers(data.subscribers || []);
    } catch (error) {
      toast.error("Failed to fetch subscribers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Subscriber deleted");
        fetchSubscribers();
      } else {
        toast.error("Failed to delete subscriber");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleExport = () => {
    const csv = [
      ["Email", "Status", "Subscribed Date"],
      ...subscribers.map((sub) => [
        sub.email,
        sub.status,
        new Date(sub.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Subscribers exported");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Newsletter Subscribers</h1>
          <p className="text-muted-foreground mt-2">
            Manage your email subscribers
          </p>
        </div>
        <Button onClick={handleExport} className="gap-2 self-start sm:self-auto">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Badge variant="default">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscribers.filter((s) => s.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unsubscribed</CardTitle>
            <Badge variant="secondary">Inactive</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscribers.filter((s) => s.status === "unsubscribed").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Subscribers</CardTitle>
          <CardDescription>
            A list of all newsletter subscribers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscribed Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No subscribers yet
                    </TableCell>
                  </TableRow>
                ) : (
                  subscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium">{subscriber.email}</TableCell>
                      <TableCell>
                        <Badge variant={subscriber.status === "active" ? "default" : "secondary"}>
                          {subscriber.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(subscriber.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(subscriber.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}