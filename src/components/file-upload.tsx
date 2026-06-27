import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  label: string;
  value?: string | null;
  onChange: (url: string | null) => void;
  accept?: string;
  folder: string;
}

export function FileUpload({ label, value, onChange, accept = "image/*", folder }: Props) {
  const [uploading, setUploading] = useState(false);

  async function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "bin";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("client-assets")
        .upload(path, file, { upsert: false });
      if (error) throw error;
      const { data } = await supabase.storage
        .from("client-assets")
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      if (!data) throw new Error("Failed to create URL");
      onChange(data.signedUrl);
      toast.success("Uploaded");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      toast.error(msg);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  const isImage = accept.startsWith("image");

  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-2">
        {label}
      </label>
      {value ? (
        <div className="flex items-center gap-3 border border-white/10 p-3 bg-white/[0.02]">
          {isImage ? (
            <img src={value} alt="" className="size-14 object-cover rounded" />
          ) : (
            <div className="size-14 grid place-items-center bg-onyx text-gold text-[9px] uppercase">
              PDF
            </div>
          )}
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-xs text-white/70 truncate hover:text-gold"
          >
            View
          </a>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-white/40 hover:text-destructive"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-center gap-2 border border-dashed border-white/15 px-4 py-6 cursor-pointer hover:border-gold hover:bg-gold/5 transition-colors">
          <Upload className="size-4 text-white/50" />
          <span className="text-xs text-white/60">{uploading ? "Uploading…" : "Choose file"}</span>
          <input
            type="file"
            accept={accept}
            onChange={handle}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}

interface GalleryProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

export function GalleryUpload({ value, onChange }: GalleryProps) {
  const [uploading, setUploading] = useState(false);

  async function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of files) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `gallery/${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage
          .from("client-assets")
          .upload(path, file, { upsert: false });
        if (error) throw error;
        const { data } = await supabase.storage
          .from("client-assets")
          .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
        if (data) urls.push(data.signedUrl);
      }
      onChange([...value, ...urls]);
      toast.success(`${urls.length} photo(s) added`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      toast.error(msg);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-2">
        Photo Gallery
      </label>
      <div className="grid grid-cols-3 gap-2">
        {value.map((url, i) => (
          <div key={url + i} className="relative aspect-square group">
            <img src={url} alt="" className="size-full object-cover rounded" />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
              className="absolute top-1 right-1 bg-obsidian/80 text-white/80 hover:text-destructive p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}
        <label className="aspect-square border border-dashed border-white/15 grid place-items-center cursor-pointer hover:border-gold hover:bg-gold/5 transition-colors">
          <Upload className="size-4 text-white/50" />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handle}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
