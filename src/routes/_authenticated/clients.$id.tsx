import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { ClientForm, type ClientDraft } from "@/components/client-form";
import { generateQrDataUrl, downloadDataUrl, downloadQrPdf, buildClientUrl } from "@/lib/qr";
import { toast } from "sonner";
import { ArrowLeft, Download, ExternalLink, FileText, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated/clients/$id")({
  head: () => ({ meta: [{ title: "Edit Client — Kach QR Code" }] }),
  component: EditClient,
});

function EditClient() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState<Tables<"clients"> | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("clients").select("*").eq("id", id).maybeSingle();
      if (error || !data) {
        toast.error("Client not found");
        navigate({ to: "/dashboard" });
        return;
      }
      setClient(data);
      setQr(await generateQrDataUrl(buildClientUrl(data.slug)));
      setLoading(false);
    })();
  }, [id, navigate]);

  async function save(draft: ClientDraft) {
    if (!client) return;

    // Strip read-only or primary/system columns before saving
    const { id, created_at, updated_at, owner_id, slug, ...updateData } = draft as Record<
      string,
      unknown
    >;

    const { data, error } = await supabase
      .from("clients")
      .update(updateData)
      .eq("id", client.id)
      .select()
      .maybeSingle();

    if (error) {
      toast.error(error.message || "Failed to save changes");
      return;
    }

    if (data) {
      setClient(data);
      const newQr = await generateQrDataUrl(buildClientUrl(data.slug));
      setQr(newQr);
    }
    toast.success("Changes saved successfully");
  }

  if (loading || !client)
    return (
      <div className="text-white/50 text-center py-20 uppercase tracking-[0.2em] text-xs">
        Loading…
      </div>
    );

  const publicUrl = buildClientUrl(client.slug);

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-gold mb-6"
      >
        <ArrowLeft className="size-3" /> Back
      </Link>

      <div className="grid lg:grid-cols-[1fr_320px] gap-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">Edit Client</p>
          <h1 className="font-serif text-4xl text-white mt-1 mb-10">{client.business_name}</h1>
          <ClientForm initial={client} onSubmit={save} submitLabel="Save Changes" />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start space-y-6 border border-gold/20 bg-gold/[0.03] p-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70 mb-1">QR Code</p>
            <h3 className="font-serif text-xl text-white">{client.business_name}</h3>
          </div>
          {qr && (
            <div className="p-3 bg-white rounded">
              <img src={qr} alt="QR code" className="w-full" />
            </div>
          )}
          <a
            href={publicUrl}
            target="_blank"
            rel="noreferrer"
            className="break-all block text-[10px] font-mono text-white/50 hover:text-gold"
          >
            {publicUrl}
          </a>
          <div className="space-y-2">
            <button
              onClick={() => qr && downloadDataUrl(qr, `${client.slug}-qr.png`)}
              className="w-full bg-gold text-obsidian py-3 text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-gold-soft transition-colors flex items-center justify-center gap-2"
            >
              <ImageIcon className="size-3.5" /> Download PNG
            </button>
            <button
              onClick={() => downloadQrPdf(publicUrl, client.business_name)}
              className="w-full border border-gold/40 text-gold py-3 text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-gold/10 transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="size-3.5" /> Download PDF
            </button>
            <Link
              to="/c/$slug"
              params={{ slug: client.slug }}
              className="w-full border border-white/10 text-white/70 py-3 text-[11px] uppercase tracking-[0.2em] hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="size-3.5" /> View Page
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
