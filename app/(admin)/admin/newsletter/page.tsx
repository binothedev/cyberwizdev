// app/admin/newsletter/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Code, Send } from "lucide-react";
import NewsletterEditor from "@/components/admin/newsletter-editor";
import { Textarea } from "@/components/ui/textarea";

export default function NewsletterPage() {
  const [sending, setSending] = useState(false);
  const [isRaw, setIsRaw] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleSendNewsletter = async () => {
    if (!subject || !content) {
      toast.error("Please provide both subject and content");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Newsletter sent to ${data.sentCount} subscribers!`);
        setSubject("");
        setContent("");
      } else {
        toast.error(data.error || "Failed to send newsletter");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Send Newsletter</h1>
        <p className="text-muted-foreground mt-2">
          Create and send newsletters to your subscribers
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compose Newsletter</CardTitle>
          <CardDescription>
            You can paste AI-generated HTML with inline CSS into the editor
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Subject Line
            </label>
            <Input
              type="text"
              placeholder="Enter email subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="max-w-2xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email Content
            </label>

            <div>
              <Button
                className="mb-2 flex items-center gap-4"
                onClick={() => setIsRaw(!isRaw)}
                variant="ghost"
                size="sm"
              >
                <Code
                  className={`${
                    isRaw ? "text-primary" : "text-muted-foreground"
                  } h-4 w-4`}
                />
                <span className="text-sm text-muted-foreground">
                  {isRaw ? "Raw HTML Mode" : "Rich Text Editor Mode"}
                </span>
              </Button>
            </div>
            {isRaw ? (
              <Textarea
                className="w-full h-64 font-mono text-xs"
                placeholder="Paste your HTML content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            ) : (
              <NewsletterEditor content={content} setContent={setContent} />
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleSendNewsletter}
              disabled={sending || !subject || !content}
              className="gap-2"
              variant="default"
            >
              <Send className="h-4 w-4" />
              {sending ? "Sending..." : "Send Newsletter"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSubject("");
                setContent("");
              }}
              disabled={sending}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
