"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { Input, Textarea, FormField } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/admin/ui";
import { useUIStore } from "@/store/ui-store";
import { saveSiteSettingsAction, type SiteSettings } from "@/server/actions/settings.actions";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const toast = useUIStore((s) => s.toast);
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState<SiteSettings>(initial);

  function set<K extends keyof SiteSettings>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveSiteSettingsAction(form);
      if (!res.ok) toast({ variant: "error", title: "Could not save", description: res.error });
      else {
        toast({ variant: "success", title: "Settings saved" });
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <Panel title="Contact details">
        <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
          <FormField label="Phone" htmlFor="s-phone"><Input id="s-phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} /></FormField>
          <FormField label="Email" htmlFor="s-email"><Input id="s-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} /></FormField>
          <FormField label="WhatsApp number" htmlFor="s-wa"><Input id="s-wa" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} /></FormField>
          <FormField label="Office address" htmlFor="s-addr"><Input id="s-addr" value={form.address} onChange={(e) => set("address", e.target.value)} /></FormField>
        </div>
      </Panel>

      <Panel title="Social media">
        <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
          <FormField label="Instagram" htmlFor="s-ig"><Input id="s-ig" value={form.instagram} onChange={(e) => set("instagram", e.target.value)} /></FormField>
          <FormField label="Facebook" htmlFor="s-fb"><Input id="s-fb" value={form.facebook} onChange={(e) => set("facebook", e.target.value)} /></FormField>
          <FormField label="YouTube" htmlFor="s-yt"><Input id="s-yt" value={form.youtube} onChange={(e) => set("youtube", e.target.value)} /></FormField>
          <FormField label="LinkedIn" htmlFor="s-li"><Input id="s-li" value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} /></FormField>
        </div>
      </Panel>

      <Panel title="SEO defaults">
        <div className="space-y-5">
          <FormField label="Default meta title" htmlFor="s-title"><Input id="s-title" value={form.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} /></FormField>
          <FormField label="Default meta description" htmlFor="s-desc"><Textarea id="s-desc" value={form.seoDescription} onChange={(e) => set("seoDescription", e.target.value)} /></FormField>
        </div>
      </Panel>

      <div className="flex justify-end">
        <Button type="submit" variant="primary" size="md" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save settings
        </Button>
      </div>
    </form>
  );
}
