import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import {
  Phone,
  MessageCircle,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  Send,
  MapPin,
  Clock,
  FileText,
  Share2,
  UserPlus,
  Music2,
  Download,
  X,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { getThemeById, type LuxuryTheme } from "@/lib/themes";

export const Route = createFileRoute("/c/$slug")({
  head: () => ({ meta: [{ title: "Profile — Kach QR Code" }] }),
  component: ClientPage,
});

function ClientPage() {
  const { slug } = Route.useParams();
  const [c, setC] = useState<Tables<"clients"> | null>(null);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("clients").select("*").eq("slug", slug).maybeSingle();
      if (!data) setMissing(true);
      else {
        setC(data);

        // Fetch total unique visitor count for the badge
        const { count } = await supabase
          .from("qr_scans")
          .select("*", { count: "exact", head: true })
          .eq("client_id", data.id);
        setVisitorCount(count ?? 0);

        // Record a unique visit if not already visited in this session
        const storageKey = `visited_client_${data.id}`;
        const hasVisited = localStorage.getItem(storageKey);
        if (!hasVisited) {
          localStorage.setItem(storageKey, "true");
          const { error } = await supabase.from("qr_scans").insert({
            client_id: data.id,
            user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
            referrer:
              typeof document !== "undefined" ? document.referrer.slice(0, 500) || null : null,
          });
          if (!error) {
            setVisitorCount((prev) => (prev !== null ? prev + 1 : 1));
          }
        }
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen bg-obsidian grid place-items-center text-gold/60 uppercase tracking-[0.3em] text-xs">
        Loading
      </div>
    );
  if (missing || !c) return <NotFoundProfile />;

  const publicUrl = typeof window !== "undefined" ? window.location.href : "";

  async function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: c!.business_name, url: publicUrl });
      } catch (err) {
        console.warn("Share failed:", err);
      }
    } else {
      await navigator.clipboard.writeText(publicUrl);
      toast.success("Link copied");
    }
  }

  function saveContact() {
    if (!c) return;
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${c.business_name}`,
      c.tagline ? `TITLE:${c.tagline}` : "",
      c.phone ? `TEL;TYPE=CELL:${c.phone}` : "",
      c.whatsapp ? `TEL;TYPE=WORK:${c.whatsapp}` : "",
      c.email ? `EMAIL:${c.email}` : "",
      c.website ? `URL:${c.website}` : "",
      c.address ? `ADR:;;${c.address};;;;` : "",
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n");
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${c.business_name}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const socials: Array<{
    key: keyof Tables<"clients">;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
  }> = [
    { key: "instagram", label: "Instagram", Icon: Instagram },
    { key: "facebook", label: "Facebook", Icon: Facebook },
    { key: "tiktok", label: "TikTok", Icon: Music2 },
    { key: "youtube", label: "YouTube", Icon: Youtube },
    { key: "telegram", label: "Telegram", Icon: Send },
    { key: "website", label: "Website", Icon: Globe },
  ];
  const activeSocials = socials.filter((s) => c[s.key]);
  const gallery = Array.isArray(c.gallery) ? (c.gallery as string[]) : [];
  const theme = getThemeById(c.theme);

  return (
    <div
      className={`min-h-screen ${theme.bgClass} ${theme.textClass} overflow-x-hidden transition-colors duration-500`}
    >
      {/* ambient glows */}
      <div
        className={`fixed top-[-15%] right-[-15%] w-[70%] h-[50%] ${theme.glowColor1} blur-[140px] pointer-events-none transition-all duration-500`}
      />
      <div
        className={`fixed bottom-[-10%] left-[-10%] w-[60%] h-[40%] ${theme.glowColor2} blur-[120px] pointer-events-none transition-all duration-500`}
      />

      <main className="relative max-w-md mx-auto pb-20">
        {/* Cover */}
        <header className="relative h-72 sm:h-80 overflow-hidden animate-fade-in">
          {c.cover_url ? (
            <img src={c.cover_url} alt="" className="absolute inset-0 size-full object-cover" />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.swatch} opacity-80`} />
          )}
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradientOverlay}`} />
          {/* gold frame edge */}
          <div
            className={`absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent`}
          />
        </header>

        <div className="px-6 -mt-20 relative">
          {/* Logo + identity */}
          <div className="flex flex-col items-center text-center animate-fade-in">
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-full ${theme.glowColor1} blur-2xl scale-110`}
              />
              <div
                className={`relative size-36 rounded-full border ${theme.accentBorder} p-[3px] ${theme.bgClass} ${theme.accentGlow} transition-all duration-500`}
              >
                <div
                  className={`size-full rounded-full border ${theme.cardBorder} overflow-hidden bg-onyx`}
                >
                  {c.logo_url ? (
                    <img
                      src={c.logo_url}
                      alt={c.business_name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div
                      className={`size-full grid place-items-center font-serif text-5xl ${theme.accentText}`}
                    >
                      {c.business_name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className={`h-px w-8 ${theme.isLight ? "bg-stone-300" : "bg-white/10"}`} />
              <span className={`text-[9px] uppercase tracking-[0.4em] ${theme.secondaryText}`}>
                Présenté par Kach
              </span>
              <span className={`h-px w-8 ${theme.isLight ? "bg-stone-300" : "bg-white/10"}`} />
            </div>

            <h1
              className={`mt-3 font-serif text-4xl sm:text-5xl ${theme.accentText} tracking-tight leading-tight transition-all duration-500`}
            >
              {c.business_name}
            </h1>
            {c.tagline && (
              <p
                className={`mt-3 ${theme.secondaryText} text-[11px] uppercase tracking-[0.3em] font-medium`}
              >
                {c.tagline}
              </p>
            )}

            {c.description && (
              <p
                className={`text-sm leading-relaxed ${theme.secondaryText} italic mt-5 max-w-xs font-serif`}
              >
                "{c.description}"
              </p>
            )}
          </div>

          {/* Primary actions */}
          <div className="mt-10 space-y-3 animate-fade-in">
            <div
              className={`grid ${c.phone && c.whatsapp ? "grid-cols-2" : "grid-cols-1"} gap-2.5`}
            >
              {c.phone && (
                <a
                  href={`tel:${c.phone}`}
                  className={`group relative overflow-hidden flex items-center justify-center gap-2 py-4 ${theme.accentBg} ${theme.isLight ? "text-white" : "text-obsidian"} font-semibold text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] ${theme.accentGlow} ${theme.accentHoverBg} transition-all duration-300 rounded-lg`}
                >
                  <Phone className="size-4 shrink-0" strokeWidth={2.5} /> Call Now
                </a>
              )}
              {c.whatsapp && (
                <a
                  href={`https://wa.me/${c.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-center gap-2 py-4 border ${theme.accentBorder} bg-white/[0.01] ${theme.accentText} font-semibold text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:bg-white/[0.05] transition-all duration-300 rounded-lg`}
                >
                  <MessageCircle className="size-4 shrink-0" strokeWidth={2.5} /> WhatsApp
                </a>
              )}
            </div>

            {c.maps_url && (
              <a
                href={c.maps_url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-center gap-2 w-full py-4 border ${theme.cardBorder} ${theme.cardBg} ${theme.primaryText} font-medium text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 rounded-lg`}
              >
                <MapPin className={`size-4 ${theme.accentText}`} strokeWidth={2} /> View on Google
                Maps
              </a>
            )}
          </div>

          {/* Social icons row */}
          {activeSocials.length > 0 && (
            <section className="mt-12 animate-fade-in">
              <SectionHeader label="Connect" theme={theme} />
              <div className="flex flex-wrap justify-center gap-3">
                {activeSocials.map(({ key, label, Icon }) => (
                  <a
                    key={label}
                    href={c[key] as string}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={`group relative size-12 grid place-items-center border ${theme.accentBorder} bg-white/[0.01] hover:${theme.accentBg} hover:scale-110 transition-all duration-300 rounded-full`}
                  >
                    <Icon
                      className={`size-4 ${theme.accentText} group-hover:${theme.isLight ? "text-white" : "text-obsidian"} transition-colors`}
                      strokeWidth={1.75}
                    />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Hours */}
          {c.business_hours && (
            <section className="mt-12 animate-fade-in">
              <SectionHeader label="Business Hours" Icon={Clock} theme={theme} />
              <div className={`border ${theme.cardBorder} ${theme.cardBg} p-5 rounded-lg`}>
                <pre
                  className={`whitespace-pre-wrap font-sans text-sm ${theme.secondaryText} leading-relaxed`}
                >
                  {c.business_hours}
                </pre>
              </div>
            </section>
          )}

          {/* Address */}
          {c.address && (
            <section className="mt-8 animate-fade-in">
              <SectionHeader label="Address" Icon={MapPin} theme={theme} />
              <p className={`text-sm ${theme.secondaryText} leading-relaxed`}>{c.address}</p>
            </section>
          )}

          {/* Gallery */}
          {gallery.length > 0 && (
            <section className="mt-12 animate-fade-in">
              <SectionHeader label="Gallery" theme={theme} />
              <div className="grid grid-cols-2 gap-2">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox(src)}
                    className={`group relative aspect-square overflow-hidden border ${theme.cardBorder} hover:border-gold/60 transition-colors rounded-lg`}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* PDF */}
          {c.pdf_url && (
            <a
              href={c.pdf_url}
              target="_blank"
              rel="noreferrer"
              className={`mt-12 flex items-center justify-between py-5 px-5 border ${theme.accentBorder} ${theme.cardBg} hover:bg-white/[0.04] transition-all rounded-lg animate-fade-in`}
            >
              <span className={`text-sm font-medium flex items-center gap-3 ${theme.primaryText}`}>
                <FileText className={`size-5 ${theme.accentText}`} /> View Brochure
              </span>
              <Download className={`size-4 ${theme.accentText}`} />
            </a>
          )}

          {/* Save + Share */}
          <div className="mt-12 grid grid-cols-2 gap-2.5 animate-fade-in">
            <button
              onClick={saveContact}
              className={`flex flex-col items-center justify-center gap-2.5 py-4 sm:py-5 border ${theme.cardBorder} ${theme.cardBg} hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 group rounded-lg px-2 text-center`}
            >
              <UserPlus className={`size-5 ${theme.accentText}`} strokeWidth={1.75} />
              <span
                className={`text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.25em] ${theme.secondaryText} group-hover:${theme.accentText} truncate w-full`}
              >
                Save Contact
              </span>
            </button>
            <button
              onClick={share}
              className={`flex flex-col items-center justify-center gap-2.5 py-4 sm:py-5 ${theme.accentBg} ${theme.isLight ? "text-white" : "text-obsidian"} font-semibold ${theme.accentGlow} hover:${theme.accentHoverBg} transition-all duration-300 rounded-lg px-2 text-center`}
            >
              <Share2 className="size-5" strokeWidth={2} />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.25em] truncate w-full">
                Share Profile
              </span>
            </button>
          </div>

          <footer className="mt-16 pt-8 border-t border-gold/10 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className={`h-px w-6 ${theme.isLight ? "bg-stone-300" : "bg-white/10"}`} />
              <span className={`${theme.accentText} font-serif italic text-xs`}>Kach</span>
              <span className={`h-px w-6 ${theme.isLight ? "bg-stone-300" : "bg-white/10"}`} />
            </div>

            <Link
              to="/"
              className={`text-[9px] ${theme.mutedText} uppercase tracking-[0.35em] hover:${theme.accentText} transition-colors`}
            >
              Powered by Kach QR Code
            </Link>

            {visitorCount !== null && (
              <div
                className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase bg-white/[0.02] border ${theme.cardBorder} ${theme.secondaryText}`}
              >
                <Users className={`size-3 ${theme.accentText}`} />
                <span>{visitorCount} views</span>
              </div>
            )}
          </footer>
        </div>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm grid place-items-center p-6 animate-fade-in"
        >
          <button
            onClick={() => setLightbox(null)}
            className={`absolute top-5 right-5 size-10 grid place-items-center border ${theme.accentBorder} ${theme.accentText} hover:bg-gold hover:text-obsidian transition-colors rounded-full`}
          >
            <X className="size-4" />
          </button>
          <img
            src={lightbox}
            alt=""
            className={`max-h-[85vh] max-w-full object-contain border ${theme.accentBorder}`}
          />
        </div>
      )}
    </div>
  );
}

function SectionHeader({
  label,
  Icon,
  theme,
}: {
  label: string;
  Icon?: React.ComponentType<{ className?: string }>;
  theme: LuxuryTheme;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className={`h-px flex-1 bg-gradient-to-r from-transparent ${theme.isLight ? "to-stone-300" : "to-white/10"}`}
      />
      <h3
        className={`text-[10px] uppercase tracking-[0.35em] ${theme.accentText} flex items-center gap-2`}
      >
        {Icon && <Icon className="size-3" />} {label}
      </h3>
      <span
        className={`h-px flex-1 bg-gradient-to-l from-transparent ${theme.isLight ? "to-stone-300" : "to-white/10"}`}
      />
    </div>
  );
}

function NotFoundProfile() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-6 text-center">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">404</p>
        <h1 className="font-serif text-4xl text-white mt-2">Profile not found</h1>
        <Link
          to="/"
          className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-gold hover:underline"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
