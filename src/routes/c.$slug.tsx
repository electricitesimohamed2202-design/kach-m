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
  Sparkles,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { getThemeById, type LuxuryTheme } from "@/lib/themes";
import { motion, AnimatePresence } from "motion/react";

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070708] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
        {/* Animated glowing circles in background */}
        <div className="absolute w-72 h-72 rounded-full bg-[#D4AF37]/5 blur-3xl -top-10 -left-10 animate-pulse" />
        <div className="absolute w-72 h-72 rounded-full bg-[#D4AF37]/5 blur-3xl -bottom-10 -right-10 animate-pulse" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Logo Monogram */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="size-24 rounded-full border border-[#D4AF37]/30 p-1 flex items-center justify-center bg-black/40 backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.1)] mb-8"
          >
            <div className="size-full rounded-full border border-[#D4AF37]/10 flex items-center justify-center bg-gradient-to-b from-[#1C1C24] to-[#0D0D12]">
              <span className="font-serif italic text-3xl text-gradient bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                K
              </span>
            </div>
          </motion.div>

          {/* Loading Ring */}
          <div className="relative size-10 mb-6">
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/15" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-t-[#D4AF37] border-r-[#D4AF37]/20 border-b-transparent border-l-transparent"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-medium"
          >
            Kach QR Code
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-[9px] uppercase tracking-[0.2em] text-white/80 mt-1 font-semibold"
          >
            Crafting Luxury
          </motion.p>
        </div>
      </div>
    );
  }

  if (missing || !c) return <NotFoundProfile />;

  const publicUrl = typeof window !== "undefined" ? window.location.origin + `/c/${c.slug}` : "";

  async function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: c!.business_name, url: publicUrl });
      } catch (err) {
        console.warn("Share failed:", err);
      }
    } else {
      await navigator.clipboard.writeText(publicUrl);
      toast.success("Profile link copied successfully.");
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
    toast.success("Contact file downloaded.");
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

  // Subtle variant classes for light/dark
  const containerShadow = theme.isLight
    ? "shadow-[0_20px_50px_rgba(28,25,23,0.06)]"
    : "shadow-[0_20px_60px_rgba(0,0,0,0.8)]";

  return (
    <div
      className={`min-h-screen ${theme.bgClass} ${theme.textClass} flex flex-col justify-start items-center relative transition-colors duration-500 overflow-x-hidden`}
    >
      {/* Dynamic Background Luxury Blur Nodes */}
      <div
        className={`fixed top-[-10%] right-[-10%] w-[80%] md:w-[50%] h-[40%] ${theme.glowColor1} blur-[120px] pointer-events-none transition-all duration-700 z-0`}
      />
      <div
        className={`fixed bottom-[-10%] left-[-10%] w-[70%] md:w-[45%] h-[40%] ${theme.glowColor2} blur-[100px] pointer-events-none transition-all duration-700 z-0`}
      />

      {/* Main Container framing the card perfectly */}
      <div className="w-full max-w-lg relative z-10 flex-1 flex flex-col justify-between">
        <div className="w-full">
          {/* Cover & Header Section */}
          <div className="relative h-44 xs:h-52 sm:h-60 md:h-68 w-full overflow-hidden">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 size-full"
            >
              {c.cover_url ? (
                <img
                  src={c.cover_url}
                  alt=""
                  className="absolute inset-0 size-full object-cover select-none"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.swatch} opacity-90`} />
              )}
              {/* Complex gradient fade overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${theme.gradientOverlay} via-transparent`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${theme.gradientOverlay} via-transparent to-transparent`}
              />
            </motion.div>

            {/* Back to Home / Utility Link if authenticated */}
            <div className="absolute top-4 left-4 z-20">
              <Link
                to="/"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest text-white/80 hover:text-white hover:bg-black/50 transition-colors"
              >
                <span>Kach</span>
              </Link>
            </div>
          </div>

          {/* Profile Identity (logo overlapping) */}
          <div className="px-5 sm:px-6 -mt-16 xs:-mt-20 sm:-mt-24 relative z-10 text-center flex flex-col items-center">
            {/* Double Border Luxury Floating Avatar */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
              className="relative"
            >
              <div
                className={`absolute inset-0 rounded-full ${theme.glowColor1} blur-2xl scale-125 opacity-70`}
              />
              <div
                className={`relative size-32 xs:size-36 sm:size-40 rounded-full border ${theme.accentBorder} p-[4px] ${theme.bgClass} ${theme.accentGlow} transition-all duration-500`}
              >
                <div
                  className={`size-full rounded-full border ${theme.cardBorder} overflow-hidden bg-gradient-to-b from-neutral-800 to-black relative shadow-inner`}
                >
                  {c.logo_url ? (
                    <img
                      src={c.logo_url}
                      alt={c.business_name}
                      className="size-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`size-full grid place-items-center font-serif text-5xl sm:text-6xl ${theme.accentText} select-none`}
                    >
                      {c.business_name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Elegant Sub-branding */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex items-center gap-3 justify-center select-none"
            >
              <span className={`h-px w-6 ${theme.isLight ? "bg-stone-300" : "bg-white/10"}`} />
              <span
                className={`text-[8px] uppercase tracking-[0.45em] font-semibold ${theme.mutedText}`}
              >
                Exclusive Digital Profile
              </span>
              <span className={`h-px w-6 ${theme.isLight ? "bg-stone-300" : "bg-white/10"}`} />
            </motion.div>

            {/* Business Title & Tagline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`mt-3 font-serif text-4xl sm:text-5xl ${theme.accentText} tracking-tight leading-tight font-normal`}
            >
              {c.business_name}
            </motion.h1>

            {c.tagline && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className={`mt-2 ${theme.secondaryText} text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-medium max-w-sm`}
              >
                {c.tagline}
              </motion.p>
            )}

            {c.description && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="max-w-md w-full"
              >
                <div
                  className={`mt-5 px-6 py-4 rounded-xl border ${theme.cardBorder} bg-white/[0.015] backdrop-blur-sm relative overflow-hidden`}
                >
                  <div
                    className={`absolute top-0 left-0 w-1 h-full ${theme.accentBg} opacity-20`}
                  />
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${theme.secondaryText} font-serif italic text-center text-stone-400`}
                  >
                    "{c.description}"
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Premium Direct Contact Actions Section */}
          <div className="px-5 sm:px-6 mt-8 space-y-3">
            <div className={`grid ${c.phone && c.whatsapp ? "grid-cols-2" : "grid-cols-1"} gap-3`}>
              {c.phone && (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  href={`tel:${c.phone}`}
                  className={`group relative overflow-hidden flex items-center justify-center gap-2.5 py-4 ${theme.accentBg} ${theme.isLight ? "text-white" : "text-obsidian"} font-bold text-xs uppercase tracking-[0.2em] ${theme.accentGlow} ${theme.accentHoverBg} transition-all duration-300 rounded-xl shadow-lg`}
                >
                  <Phone
                    className="size-4 shrink-0 transition-transform group-hover:scale-110"
                    strokeWidth={2.5}
                  />
                  <span>Call Now</span>
                </motion.a>
              )}
              {c.whatsapp && (
                <motion.a
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  href={`https://wa.me/${c.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-center gap-2.5 py-4 border ${theme.accentBorder} bg-white/[0.01] ${theme.accentText} font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/[0.04] transition-all duration-300 rounded-xl`}
                >
                  <MessageCircle className="size-4 shrink-0" strokeWidth={2.5} />
                  <span>WhatsApp</span>
                </motion.a>
              )}
            </div>

            {c.maps_url && (
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                href={c.maps_url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-center gap-2.5 w-full py-4 border ${theme.cardBorder} bg-white/[0.015] ${theme.primaryText} font-semibold text-xs uppercase tracking-[0.2em] hover:border-amber-500/30 hover:bg-amber-500/[0.02] transition-all duration-300 rounded-xl`}
              >
                <MapPin className={`size-4 ${theme.accentText}`} strokeWidth={2.5} />
                <span>View on Google Maps</span>
              </motion.a>
            )}
          </div>

          {/* Social Icons row transformed into Premium floating badges */}
          {activeSocials.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="px-5 sm:px-6 mt-12"
            >
              <SectionHeader label="Connect With Us" theme={theme} />
              <div className="flex flex-wrap justify-center gap-3">
                {activeSocials.map(({ key, label, Icon }, idx) => (
                  <motion.a
                    key={label}
                    href={c[key] as string}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={`group relative size-12 grid place-items-center border ${theme.cardBorder} bg-white/[0.01] hover:border-amber-500/40 hover:bg-amber-500/[0.04] transition-all duration-300 rounded-full`}
                  >
                    <Icon
                      className={`size-4 ${theme.accentText} group-hover:scale-105 transition-transform`}
                      strokeWidth={2}
                    />
                    <div className="absolute inset-0 rounded-full bg-amber-500/5 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                  </motion.a>
                ))}
              </div>
            </motion.section>
          )}

          {/* Business Hours Segment */}
          {c.business_hours && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="px-5 sm:px-6 mt-12"
            >
              <SectionHeader label="Business Hours" Icon={Clock} theme={theme} />
              <div
                className={`border ${theme.cardBorder} bg-white/[0.015] backdrop-blur-sm p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/25 transition-colors duration-500`}
              >
                <div
                  className={`absolute top-0 right-0 w-24 h-24 ${theme.glowColor1} blur-2xl opacity-20 pointer-events-none`}
                />
                <pre
                  className={`whitespace-pre-wrap font-sans text-xs sm:text-sm ${theme.secondaryText} leading-relaxed font-normal`}
                >
                  {c.business_hours}
                </pre>
              </div>
            </motion.section>
          )}

          {/* Address card */}
          {c.address && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05 }}
              className="px-5 sm:px-6 mt-10"
            >
              <SectionHeader label="Location Details" Icon={MapPin} theme={theme} />
              <div
                className={`border ${theme.cardBorder} bg-white/[0.015] backdrop-blur-sm p-5 rounded-2xl flex items-start gap-3 group hover:border-amber-500/25 transition-colors duration-500`}
              >
                <MapPin className={`size-5 ${theme.accentText} shrink-0 mt-0.5`} strokeWidth={2} />
                <p className={`text-xs sm:text-sm ${theme.secondaryText} leading-relaxed`}>
                  {c.address}
                </p>
              </div>
            </motion.section>
          )}

          {/* Luxury Photo Gallery with Bento Grid layout */}
          {gallery.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="px-5 sm:px-6 mt-12"
            >
              <SectionHeader label="Visual Gallery" theme={theme} />
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
                {gallery.map((src, i) => {
                  // Asymmetrical layout logic for premium styling
                  let colSpan = "col-span-1 sm:col-span-3 aspect-square sm:aspect-[16/10]";
                  if (gallery.length % 3 === 1 && i === 0) {
                    colSpan = "col-span-2 sm:col-span-6 aspect-[16/10] sm:aspect-[16/10]";
                  } else if (i % 3 === 0) {
                    colSpan = "col-span-2 sm:col-span-4 aspect-[4/3] sm:aspect-[4/3]";
                  } else if (i % 3 === 1) {
                    colSpan = "col-span-1 sm:col-span-2 aspect-square sm:aspect-square";
                  } else if (i % 3 === 2) {
                    colSpan = "col-span-2 sm:col-span-6 aspect-[16/10] sm:aspect-[16/8]";
                  }

                  return (
                    <motion.button
                      key={i}
                      onClick={() => setLightbox(src)}
                      whileHover={{ scale: 1.015, y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className={`${colSpan} relative overflow-hidden border ${theme.cardBorder} hover:border-amber-500/40 rounded-2xl bg-black/40 shadow-lg cursor-pointer group`}
                    >
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <span className="text-[9px] uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1">
                          Expand <ArrowRight className="size-3" />
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* PDF Brochure Card with visual luxury elevation */}
          {c.pdf_url && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 }}
              className="px-5 sm:px-6 mt-12"
            >
              <a
                href={c.pdf_url}
                target="_blank"
                rel="noreferrer"
                className={`group flex items-center justify-between py-5 px-6 border ${theme.accentBorder} bg-gradient-to-r from-amber-500/[0.03] to-amber-500/[0.08] hover:to-amber-500/[0.15] ${theme.accentGlow} transition-all duration-300 rounded-2xl`}
              >
                <span
                  className={`text-xs sm:text-sm font-semibold flex items-center gap-3.5 ${theme.primaryText}`}
                >
                  <FileText className={`size-5 ${theme.accentText}`} strokeWidth={2} />
                  <span className="uppercase tracking-[0.15em] text-[10px] sm:text-xs text-stone-200">
                    View Menu & Brochure
                  </span>
                </span>
                <div
                  className={`p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-all`}
                >
                  <Download
                    className={`size-3.5 ${theme.accentText} transition-transform group-hover:translate-y-0.5`}
                    strokeWidth={2.5}
                  />
                </div>
              </a>
            </motion.div>
          )}

          {/* Primary footer buttons: Save Contact and Share */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="px-5 sm:px-6 mt-12 grid grid-cols-2 gap-3"
          >
            <button
              onClick={saveContact}
              className={`flex flex-col items-center justify-center gap-2 py-4 border ${theme.cardBorder} bg-white/[0.015] hover:border-amber-500/40 hover:bg-amber-500/[0.03] transition-all duration-300 group rounded-xl px-4 text-center cursor-pointer shadow-lg`}
            >
              <UserPlus
                className={`size-5 ${theme.accentText} transition-transform group-hover:scale-105`}
                strokeWidth={1.5}
              />
              <span
                className={`text-[9px] uppercase tracking-[0.25em] ${theme.secondaryText} group-hover:text-amber-400 truncate w-full font-bold`}
              >
                Save Contact
              </span>
            </button>
            <button
              onClick={share}
              className={`flex flex-col items-center justify-center gap-2 py-4 ${theme.accentBg} ${theme.isLight ? "text-white" : "text-obsidian"} font-bold ${theme.accentGlow} hover:${theme.accentHoverBg} transition-all duration-300 rounded-xl px-4 text-center cursor-pointer shadow-lg`}
            >
              <Share2 className="size-5 transition-transform hover:scale-105" strokeWidth={2} />
              <span className="text-[9px] uppercase tracking-[0.25em] truncate w-full font-bold">
                Share Profile
              </span>
            </button>
          </motion.div>
        </div>

        {/* Elegant Footer & Stats branding */}
        <footer className="px-5 sm:px-6 mt-20 pb-12 text-center select-none">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className={`h-px w-8 ${theme.isLight ? "bg-stone-300" : "bg-white/10"}`} />
            <span className={`${theme.accentText} font-serif italic text-sm tracking-widest`}>
              Kach
            </span>
            <span className={`h-px w-8 ${theme.isLight ? "bg-stone-300" : "bg-white/10"}`} />
          </div>

          <Link
            to="/"
            className={`text-[8px] ${theme.mutedText} uppercase tracking-[0.4em] hover:${theme.accentText} transition-colors font-medium`}
          >
            Powered by Kach QR Code
          </Link>

          {visitorCount !== null && (
            <div className="mt-5 block">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[9px] font-mono tracking-widest uppercase bg-white/[0.01] border ${theme.cardBorder} ${theme.secondaryText}`}
              >
                <Users className={`size-3 ${theme.accentText}`} />
                <span>{visitorCount} views</span>
              </div>
            </div>
          )}
        </footer>
      </div>

      {/* Lightbox for elegant full-resolution photo overlays */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md grid place-items-center p-4"
          >
            {/* Close button with luxury circular outline */}
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-5 right-5 size-11 grid place-items-center border border-white/20 text-white hover:border-white hover:bg-white/10 transition-colors rounded-full cursor-pointer"
              onClick={() => setLightbox(null)}
            >
              <X className="size-5" />
            </motion.button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
              src={lightbox}
              alt=""
              className="max-h-[85vh] max-w-full object-contain border border-white/10 shadow-2xl rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
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
    <div className="flex items-center gap-4.5 mb-6 select-none">
      <span
        className={`h-px flex-1 bg-gradient-to-r from-transparent ${theme.isLight ? "to-stone-300/60" : "to-white/10"}`}
      />
      <h3
        className={`text-[9px] uppercase tracking-[0.4em] ${theme.accentText} flex items-center gap-2 font-bold whitespace-nowrap`}
      >
        {Icon && <Icon className="size-3 text-amber-500" />} {label}
      </h3>
      <span
        className={`h-px flex-1 bg-gradient-to-l from-transparent ${theme.isLight ? "to-stone-300/60" : "to-white/10"}`}
      />
    </div>
  );
}

function NotFoundProfile() {
  return (
    <div className="min-h-screen bg-[#070708] flex items-center justify-center px-6 text-center select-none">
      {/* Glow background effects */}
      <div className="absolute w-72 h-72 rounded-full bg-[#D4AF37]/5 blur-3xl -top-10 -left-10" />
      <div className="absolute w-72 h-72 rounded-full bg-[#D4AF37]/5 blur-3xl -bottom-10 -right-10" />

      <div className="relative z-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-semibold mb-2">
          Error 404
        </p>
        <h1 className="font-serif text-4xl text-white">Profile Not Found</h1>
        <p className="text-xs text-slate-400 mt-2.5 max-w-xs">
          The luxury digital business card you are looking for does not exist or has been modified.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block px-5 py-3 border border-[#D4AF37]/30 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors rounded-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
