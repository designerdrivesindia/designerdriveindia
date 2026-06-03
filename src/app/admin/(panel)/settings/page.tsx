import { redirect } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/ui";
import { SettingsForm } from "@/components/admin/settings-form";
import { getCurrentUser } from "@/server/auth/session";
import { getSetting } from "@/server/repositories/settings.repo";
import { siteConfig } from "@/lib/site";
import type { SiteSettings } from "@/server/actions/settings.actions";

export default async function SettingsPage() {
  const me = await getCurrentUser();
  if (!me || me.role !== "super_admin") redirect("/admin");

  const saved = await getSetting<Partial<SiteSettings>>("site");

  const initial: SiteSettings = {
    phone: saved?.phone ?? siteConfig.contact.phone,
    email: saved?.email ?? siteConfig.contact.email,
    whatsapp: saved?.whatsapp ?? siteConfig.contact.whatsapp,
    address: saved?.address ?? siteConfig.contact.address,
    instagram: saved?.instagram ?? siteConfig.social.instagram,
    facebook: saved?.facebook ?? siteConfig.social.facebook,
    youtube: saved?.youtube ?? siteConfig.social.youtube,
    linkedin: saved?.linkedin ?? siteConfig.social.linkedin,
    seoTitle: saved?.seoTitle ?? `${siteConfig.name} — ${siteConfig.tagline}`,
    seoDescription: saved?.seoDescription ?? siteConfig.description,
  };

  return (
    <>
      <AdminPageHeader title="Settings" subtitle="Site-wide configuration" />
      <SettingsForm initial={initial} />
    </>
  );
}
