"use client";

import { useState, useTransition } from "react";
import { Loader2, Send } from "lucide-react";
import { assignInquiryAction, addInquiryNoteAction } from "@/server/actions/inquiries.actions";
import { Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui-store";

export function AssignSelect({
  id,
  assignedToId,
  users,
}: {
  id: string;
  assignedToId: string | null;
  users: { id: string; name: string }[];
}) {
  const [value, setValue] = useState(assignedToId ?? "");
  const [pending, startTransition] = useTransition();
  const toast = useUIStore((s) => s.toast);

  function change(next: string) {
    setValue(next);
    startTransition(async () => {
      const res = await assignInquiryAction(id, next || null);
      if (!res.ok) toast({ variant: "error", title: "Could not assign", description: res.error });
      else toast({ variant: "success", title: "Assignment updated" });
    });
  }

  return (
    <Select value={value} disabled={pending} onChange={(e) => change(e.target.value)}>
      <option value="">Unassigned</option>
      {users.map((u) => (
        <option key={u.id} value={u.id}>{u.name}</option>
      ))}
    </Select>
  );
}

export function AddNoteForm({ id }: { id: string }) {
  const [body, setBody] = useState("");
  const [pending, startTransition] = useTransition();
  const toast = useUIStore((s) => s.toast);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    startTransition(async () => {
      const res = await addInquiryNoteAction(id, body);
      if (!res.ok) {
        toast({ variant: "error", title: "Could not add note", description: res.error });
      } else {
        setBody("");
        toast({ variant: "success", title: "Note added" });
      }
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Add an internal note about this lead…"
        className="min-h-20"
      />
      <Button type="submit" variant="primary" size="sm" disabled={pending || !body.trim()} className="self-end">
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        Add note
      </Button>
    </form>
  );
}
