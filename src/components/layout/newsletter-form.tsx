"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useUIStore } from "@/store/ui-store";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const toast = useUIStore((s) => s.toast);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ variant: "error", title: "Enter a valid email" });
      return;
    }
    setDone(true);
    toast({
      variant: "success",
      title: "You're subscribed",
      description: "Look out for travel stories and seasonal offers.",
    });
    setEmail("");
  };

  return (
    <form onSubmit={onSubmit} className="flex max-w-sm items-center gap-2">
      <div className="relative flex-1">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          aria-label="Email address"
          className="h-11 w-full rounded-full border border-cream/20 bg-cream/5 px-4 text-sm text-cream placeholder:text-cream/50 focus:border-gold focus:outline-none"
        />
      </div>
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold text-paper transition-colors hover:bg-gold-soft"
      >
        {done ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}
