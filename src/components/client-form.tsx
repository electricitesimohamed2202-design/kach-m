import { useState } from "react";
import type { TablesInsert } from "@/integrations/supabase/types";
import { FileUpload, GalleryUpload } from "@/components/file-upload";
import { LUXURY_THEMES } from "@/lib/themes";

export type ClientDraft = TablesInsert<"clients">;

interface Props {
  initial?: Partial<ClientDraft>;
  onSubmit: (draft: ClientDraft) => Promise<void>;
  submitLabel: string;
}

const FIELDS: Array<{
  key: keyof ClientDraft;
  label: string;
  placeholder?: string;
  type?: string;
}> = [
  { key: "phone", label: "Phone", placeholder: "+1 555 000 0000" },
  { key: "whatsapp", label: "WhatsApp", placeholder: "+1 555 000 0000" },
  { key: "email", label: "Email", placeholder: "hello@business.com", type: "email" },
  { key: "website", label: "Website", placeholder: "https://…" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/…" },
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/…" },
  { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@…" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/…" },
  { key: "telegram", label: "Telegram", placeholder: "https://t.me/…" },
  { key: "maps_url", label: "Google Maps URL", placeholder: "https://maps.google.com/…" },
  { key: "address", label: "Address", placeholder: "123 Luxury Ave, City" },
];

export function ClientForm({ initial, onSubmit, submitLabel }: Props) {
  const [d, setD] = useState<Partial<ClientDraft>>(initial ?? {});
  const [saving, setSaving] = useState(false);

  function update<K extends keyof ClientDraft>(k: K, v: ClientDraft[K] | null) {
    setD((prev) => ({ ...prev, [k]: v }));
  }

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    if (!d.business_name) return;
    setSaving(true);
    try {
      await onSubmit(d as ClientDraft);
    } finally {
      setSaving(false);
    }
  }

  const gallery = (d.gallery as string[] | undefined) ?? [];

  return (
    <form onSubmit={handle} className="space-y-10">
      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-gold">Identity</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Business Name *">
            <input
              required
              value={d.business_name ?? ""}
              onChange={(e) => update("business_name", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Business Category">
            <select
              value={d.category ?? ""}
              onChange={(e) => update("category", (e.target.value || null) as string | null)}
              className={inputCls}
            >
              <option value="" className="bg-obsidian">
                Select category
              </option>
              {[
                "Restaurant",
                "Café",
                "Hotel",
                "Retail",
                "Beauty & Spa",
                "Fashion",
                "Health & Fitness",
                "Real Estate",
                "Automotive",
                "Professional Services",
                "Education",
                "Entertainment",
                "Technology",
                "Other",
              ].map((c) => (
                <option key={c} value={c} className="bg-obsidian">
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Tagline">
          <input
            value={d.tagline ?? ""}
            onChange={(e) => update("tagline", e.target.value)}
            placeholder="Short tagline"
            className={inputCls}
          />
        </Field>
        <Field label="Description">
          <textarea
            value={d.description ?? ""}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className={inputCls + " resize-none"}
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <FileUpload
            label="Logo / Profile Photo"
            value={d.logo_url}
            onChange={(url) => update("logo_url", url)}
            folder="logos"
          />
          <FileUpload
            label="Cover Image"
            value={d.cover_url}
            onChange={(url) => update("cover_url", url)}
            folder="covers"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-gold">Theme</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {LUXURY_THEMES.map((t) => {
            const active = (d.theme ?? "obsidian") === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => update("theme", t.id as string)}
                className={`p-2.5 border text-left transition-all duration-300 rounded-lg ${active ? "border-gold bg-gold/10" : "border-white/10 hover:border-white/30"}`}
              >
                <div className={`h-10 w-full bg-gradient-to-br ${t.swatch} rounded mb-1.5`} />
                <div
                  className="text-[10px] uppercase tracking-[0.12em] text-white/80 truncate font-medium"
                  title={t.name}
                >
                  {t.name}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-gold">Contact & Social</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {FIELDS.map((f) => (
            <Field key={f.key} label={f.label}>
              <input
                type={f.type ?? "text"}
                placeholder={f.placeholder}
                value={(d[f.key] as string) ?? ""}
                onChange={(e) => update(f.key, (e.target.value || null) as unknown as null)}
                className={inputCls}
              />
            </Field>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-gold">Hours & Documents</h2>
        <Field label="Business Hours">
          <textarea
            value={d.business_hours ?? ""}
            onChange={(e) => update("business_hours", e.target.value)}
            rows={3}
            placeholder={"Mon-Fri 9:00 – 18:00\nSat 10:00 – 16:00\nSun closed"}
            className={inputCls + " resize-none font-mono text-xs"}
          />
        </Field>
        <FileUpload
          label="PDF Document (brochure, menu, etc.)"
          value={d.pdf_url}
          onChange={(url) => update("pdf_url", url)}
          accept="application/pdf"
          folder="pdfs"
        />
      </section>

      <section>
        <h2 className="font-serif text-2xl text-gold mb-4">Gallery</h2>
        <GalleryUpload value={gallery} onChange={(urls) => update("gallery", urls as string[])} />
      </section>

      <button
        type="submit"
        disabled={saving || !d.business_name}
        className="bg-gold text-obsidian px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-gold-soft disabled:opacity-40 transition-colors gold-glow"
      >
        {saving ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

const inputCls =
  "w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
