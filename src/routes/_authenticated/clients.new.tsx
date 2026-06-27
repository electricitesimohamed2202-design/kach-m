import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { ClientForm, type ClientDraft } from "@/components/client-form";
import { slugify } from "@/lib/qr";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_authenticated/clients/new")({
  head: () => ({ meta: [{ title: "New Client — Kach QR Code" }] }),
  component: NewClient,
});

function NewClient() {
  const navigate = useNavigate();

  async function create(draft: ClientDraft) {
    const baseSlug = slugify(draft.business_name);
    let slug = baseSlug;
    let attempt = 0;
    // ensure unique slug
    while (true) {
      const { data } = await supabase.from("clients").select("id").eq("slug", slug).maybeSingle();
      if (!data) break;
      attempt++;
      slug = `${baseSlug}-${attempt + 1}`;
    }
    const { data, error } = await supabase
      .from("clients")
      .insert({ ...draft, slug })
      .select()
      .single();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Client created");
    navigate({ to: "/clients/$id", params: { id: data.id } });
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-gold mb-6"
      >
        <ArrowLeft className="size-3" /> Back
      </Link>
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">Add Client</p>
      <h1 className="font-serif text-4xl text-white mt-1 mb-10">New Profile</h1>
      <ClientForm onSubmit={create} submitLabel="Create Client" />
    </div>
  );
}
