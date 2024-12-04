"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Clipboard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Component() {
  const [email, setEmail] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setEmail(text);
      toast({
        title: "Email pasted",
        description: "The email has been pasted from your clipboard.",
      });
    } catch {
      toast({
        title: "Paste failed",
        description:
          "Unable to paste from clipboard. Please enter the email manually.",
        variant: "destructive",
      });
    }
  };

  const handleAskPPP = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address before asking about PPP.",
        variant: "destructive",
      });
      return;
    }

    const subject = "Inquiry about PPP Pricing for Indonesia";
    const body =
      "Do you offer PPP (Purchasing Power Parity) pricing for Indonesia?";

    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-4 ">
        <div className="space-y-3">
          <div className="flex space-x-2">
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
            />
            <Button
              onClick={handlePaste}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Clipboard className="w-4 h-4" />
              <span className="sr-only">Paste Email</span>
            </Button>
          </div>
          <Button
            onClick={handleAskPPP}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Mail className="w-4 h-4" />
            <span>Ask about PPP</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
