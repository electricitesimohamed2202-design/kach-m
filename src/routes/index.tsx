import { createFileRoute, Link } from "@tanstack/react-router";
import { QrCode, Sparkles, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kach QR Code — Luxury Digital Profiles" },
      {
        name: "description",
        content: "Premium digital business profiles delivered through a single elegant QR code.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-obsidian text-white relative overflow-hidden">
      <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[50%] bg-gold/5 blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[40%] bg-gold/5 blur-[120px] pointer-events-none" />

      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-6xl mx-auto">
        <span className="font-serif text-2xl text-gold tracking-tight">Kach QR Code</span>
        <Link
          to="/auth"
          className="text-[10px] uppercase tracking-[0.25em] text-white/60 hover:text-gold transition-colors"
        >
          Admin
        </Link>
      </nav>

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-16 pb-24 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold/70 mb-6">
          Luxury Digital Identity
        </p>
        <h1 className="font-serif text-5xl md:text-7xl text-white leading-[1.05] text-balance">
          One scan.
          <span className="block italic text-gold">An entire presence.</span>
        </h1>
        <p className="mt-8 text-base text-white/60 max-w-xl mx-auto leading-relaxed">
          Kach QR Code crafts elegant digital profile pages for discerning businesses and delivers
          them through a single, premium QR code.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/auth"
            className="bg-gold text-obsidian px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-gold-soft transition-colors gold-glow"
          >
            Enter Admin
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              icon: QrCode,
              title: "Instant QR",
              body: "Auto-generated, downloadable as PNG or branded PDF.",
            },
            {
              icon: Sparkles,
              title: "Curated Profiles",
              body: "Logo, socials, hours, gallery and contact in one luxe page.",
            },
            {
              icon: Shield,
              title: "Admin Control",
              body: "Secure dashboard to manage every client profile.",
            },
          ].map((f) => (
            <div key={f.title} className="border border-white/5 bg-white/[0.02] p-6">
              <f.icon className="size-5 text-gold mb-4" strokeWidth={1.5} />
              <h3 className="font-serif text-xl text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
          Powered by Kach QR Code
        </p>
      </footer>
    </div>
  );
}
