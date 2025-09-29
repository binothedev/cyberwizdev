// components/whatsapp-button.tsx
"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
  const phoneNumber = "1234567890"; // Replace with your WhatsApp number (country code + number, no + or spaces)
  const message = "Hi! I'm interested in your services.";
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 left-6 h-14 w-14 rounded-full shadow-lg z-40 bg-green-500 hover:bg-green-600"
      size="icon"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" />
    </Button>
  );
}