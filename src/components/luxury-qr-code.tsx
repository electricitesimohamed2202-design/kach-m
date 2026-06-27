import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Download,
  Copy,
  Sparkles,
  Award,
  CircleDot,
  Frame,
  RotateCcw,
  Check,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

interface LuxuryQRCodeProps {
  url: string;
  businessName: string;
  logoUrl?: string | null;
  category?: string | null;
  onClose?: () => void;
}

interface QRStyleOption {
  id: string;
  name: string;
  fgColor: string;
  bgColor: string;
  accentColor: string;
  badgeBg: string;
}

const LUXURY_COLORS: QRStyleOption[] = [
  {
    id: "imperial-gold",
    name: "Imperial Gold",
    fgColor: "#D4AF37",
    bgColor: "#0A0A0B",
    accentColor: "#F3E5AB",
    badgeBg: "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20",
  },
  {
    id: "platinum-silver",
    name: "Platinum Silver",
    fgColor: "#E5E4E2",
    bgColor: "#0A0A0B",
    accentColor: "#FFFFFF",
    badgeBg: "bg-white/10 text-white border-white/20",
  },
  {
    id: "emerald-noir",
    name: "Emerald Royal",
    fgColor: "#2EBD93",
    bgColor: "#061A13",
    accentColor: "#A7F3D0",
    badgeBg: "bg-[#2EBD93]/10 text-[#2EBD93] border-[#2EBD93]/20",
  },
  {
    id: "ruby-velvet",
    name: "Ruby Velvet",
    fgColor: "#B8324A",
    bgColor: "#140508",
    accentColor: "#FECDD3",
    badgeBg: "bg-[#B8324A]/10 text-[#B8324A] border-[#B8324A]/20",
  },
  {
    id: "champagne",
    name: "Champagne Rose",
    fgColor: "#E8C5A8",
    bgColor: "#1F1517",
    accentColor: "#FFE4E6",
    badgeBg: "bg-[#E8C5A8]/10 text-[#E8C5A8] border-[#E8C5A8]/20",
  },
  {
    id: "pure-onyx",
    name: "Onyx Minimalist",
    fgColor: "#111111",
    bgColor: "#FFFFFF",
    accentColor: "#555555",
    badgeBg: "bg-slate-900/10 text-slate-800 border-slate-900/10",
  },
];

const FRAME_PRESETS = [
  { id: "none", name: "Standard QR" },
  { id: "minimal", name: "Classic Border" },
  { id: "luxury-card", name: "Branded Card" },
  { id: "regal-ornate", name: "Regal Ornate" },
];

const EMBLEM_PRESETS = [
  { id: "none", name: "No Emblem" },
  { id: "crown", name: "Crown Emblem" },
  { id: "star", name: "Ornate Star" },
  { id: "monogram", name: "Serif Monogram" },
  { id: "logo", name: "Business Logo" },
];

export function LuxuryQRCode({ url, businessName, logoUrl, category, onClose }: LuxuryQRCodeProps) {
  const [selectedColor, setSelectedColor] = useState<QRStyleOption>(LUXURY_COLORS[0]);
  const [frameStyle, setFrameStyle] = useState<string>("minimal");
  const [emblemStyle, setEmblemStyle] = useState<string>(logoUrl ? "logo" : "monogram");
  const [customFg, setCustomFg] = useState<string>("#D4AF37");
  const [customBg, setCustomBg] = useState<string>("#0A0A0B");
  const [useCustomColors, setUseCustomColors] = useState<boolean>(false);
  const [frameText, setFrameText] = useState<string>("SCAN TO DISCOVER");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const qrSize = isMobile ? 150 : 220;

  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenRenderCanvasRef = useRef<HTMLCanvasElement>(null);

  const fg = useCustomColors ? customFg : selectedColor.fgColor;
  const bg = useCustomColors ? customBg : selectedColor.bgColor;

  // Helper to safely convert SVG to cross-browser safe Base64 URL (Unicode-safe)
  const toBase64Svg = (svgString: string) => {
    try {
      return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgString)))}`;
    } catch (e) {
      // Fallback to URL encoded if btoa fails
      return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
    }
  };

  // Pre-generate custom base64 SVG emblem URLs
  const getCrownEmblemUrl = (color: string) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M5 16h14a1 1 0 0 0 1-.764l2.5-10a1 1 0 0 0-1.562-1.01L17.5 7.114 13.062 2.232a1 1 0 0 0-1.124 0L7.5 7.114 4.062 4.226a1 1 0 0 0-1.562 1.01l2.5 10A1 1 0 0 0 5 16zm-3 2h20v2H2z"/></svg>`;
    return toBase64Svg(svg);
  };

  const getStarEmblemUrl = (color: string) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    return toBase64Svg(svg);
  };

  const getMonogramEmblemUrl = (char: string, textColor: string, backColor: string) => {
    const letter = char.trim().toUpperCase().substring(0, 1) || "K";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><circle cx="50" cy="50" r="48" fill="${backColor}" stroke="${textColor}" stroke-width="4"/><text x="50" y="62" font-family="'Times New Roman', 'Playfair Display', 'Georgia', serif" font-size="46" font-weight="bold" fill="${textColor}" text-anchor="middle">${letter}</text></svg>`;
    return toBase64Svg(svg);
  };

  const getEmblemSettings = () => {
    if (emblemStyle === "none") return undefined;

    let src = "";
    if (emblemStyle === "crown") {
      src = getCrownEmblemUrl(fg);
    } else if (emblemStyle === "star") {
      src = getStarEmblemUrl(fg);
    } else if (emblemStyle === "monogram") {
      src = getMonogramEmblemUrl(businessName, fg, bg);
    } else if (emblemStyle === "logo" && logoUrl) {
      src = logoUrl;
    } else {
      return undefined;
    }

    return {
      src,
      height: isMobile ? 30 : 44,
      width: isMobile ? 30 : 44,
      excavate: true,
      ...(src.startsWith("data:") ? {} : { crossOrigin: "anonymous" }),
    };
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      toast.success("Profile link copied successfully");
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error("Failed to copy profile link");
    }
  };

  // Draws the high-res QR code + custom frame + text on a dynamic canvas for downloading
  const drawAndDownloadHighRes = () => {
    const qrCanvas = qrCanvasRef.current;
    if (!qrCanvas) return;

    const exportSize = 2048; // Excellent high-resolution print standard
    const scale = exportSize / 512; // Base preview is sized around 512px

    const canvas = document.createElement("canvas");
    canvas.width = exportSize;
    canvas.height = exportSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill overall background
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, exportSize, exportSize);

    // Render the QR code centered on the high-res canvas
    const qrSize = exportSize * 0.65;
    const qrX = (exportSize - qrSize) / 2;
    const qrY = (exportSize - qrSize) / 2 - (frameStyle !== "none" ? 40 * scale : 0);

    // Render original QR scaled
    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

    // Render Frame Styling
    if (frameStyle === "minimal") {
      // Elegant simple border frame
      ctx.strokeStyle = fg;
      ctx.lineWidth = 4 * scale;
      const borderPadding = 30 * scale;
      ctx.strokeRect(
        qrX - borderPadding,
        qrY - borderPadding,
        qrSize + borderPadding * 2,
        qrSize + borderPadding * 2 + (frameText ? 50 * scale : 0),
      );

      // Label text
      if (frameText) {
        ctx.fillStyle = fg;
        ctx.font = `bold ${14 * scale}px 'Inter', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.letterSpacing = "6px";
        ctx.fillText(
          frameText.toUpperCase(),
          exportSize / 2,
          qrY + qrSize + borderPadding + 15 * scale,
        );
      }
    } else if (frameStyle === "luxury-card") {
      // Deep double-border frame with branding card info at bottom
      ctx.strokeStyle = fg;
      ctx.lineWidth = 2 * scale;
      const pad = 40 * scale;

      // Outer border
      ctx.strokeRect(pad, pad, exportSize - pad * 2, exportSize - pad * 2);

      // Inner thin border
      ctx.lineWidth = 1 * scale;
      ctx.strokeRect(
        pad + 8 * scale,
        pad + 8 * scale,
        exportSize - (pad + 8 * scale) * 2,
        exportSize - (pad + 8 * scale) * 2,
      );

      // Bottom information display
      ctx.fillStyle = fg;
      ctx.textAlign = "center";

      // Business Name (Elegant serif feel on download)
      ctx.font = `italic bold ${24 * scale}px 'Georgia', serif`;
      ctx.fillText(businessName, exportSize / 2, qrY + qrSize + 60 * scale);

      // Subtitle/Category
      if (category) {
        ctx.font = `${11 * scale}px 'Inter', sans-serif`;
        ctx.letterSpacing = "4px";
        ctx.fillStyle = `${fg}99`; // slightly transparent
        ctx.fillText(category.toUpperCase(), exportSize / 2, qrY + qrSize + 90 * scale);
      }

      // Small crown emblem or star above the name
      ctx.fillStyle = fg;
      ctx.font = `${14 * scale}px 'Inter', sans-serif`;
      ctx.fillText("✦  ✦  ✦", exportSize / 2, qrY - 40 * scale);
    } else if (frameStyle === "regal-ornate") {
      // Lavish ornate border with customized corner brackets
      ctx.strokeStyle = fg;
      ctx.lineWidth = 5 * scale;
      const borderPadding = 45 * scale;
      const startX = qrX - borderPadding;
      const startY = qrY - borderPadding;
      const w = qrSize + borderPadding * 2;
      const h = qrSize + borderPadding * 2 + (frameText ? 40 * scale : 0);

      // Main frame
      ctx.strokeRect(startX, startY, w, h);

      // Inner ornate accent lines
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeRect(startX + 8 * scale, startY + 8 * scale, w - 16 * scale, h - 16 * scale);

      // Draw elegant corner triangles/accents manually
      const offset = 24 * scale;
      ctx.fillStyle = fg;

      const drawCornerAccent = (x: number, y: number, rX: number, rY: number) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + rX, y);
        ctx.lineTo(x, y + rY);
        ctx.closePath();
        ctx.fill();
      };

      drawCornerAccent(startX + 12 * scale, startY + 12 * scale, offset, offset);
      drawCornerAccent(startX + w - 12 * scale, startY + 12 * scale, -offset, offset);
      drawCornerAccent(startX + 12 * scale, startY + h - 12 * scale, offset, -offset);
      drawCornerAccent(startX + w - 12 * scale, startY + h - 12 * scale, -offset, -offset);

      if (frameText) {
        ctx.fillStyle = fg;
        ctx.font = `bold ${15 * scale}px 'Georgia', serif`;
        ctx.textAlign = "center";
        ctx.letterSpacing = "8px";
        ctx.fillText(frameText.toUpperCase(), exportSize / 2, startY + h - 22 * scale);
      }
    }

    // Trigger immediate download
    const filename = `${businessName.toLowerCase().replace(/\s+/g, "-")}-luxury-qr.png`;
    const imageUri = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageUri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("High-resolution QR code downloaded!");
  };

  const handleReset = () => {
    setSelectedColor(LUXURY_COLORS[0]);
    setFrameStyle("minimal");
    setEmblemStyle(logoUrl ? "logo" : "monogram");
    setUseCustomColors(false);
    setFrameText("SCAN TO DISCOVER");
    toast.info("Settings reset to premium default");
  };

  return (
    <div className="bg-[#0F0F12]/95 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-white relative shadow-2xl backdrop-blur-xl">
      {/* Background radial glows inside the widget */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* HEADER BAR FOR MODAL WIDGET */}
      <div className="md:col-span-12 flex items-center justify-between border-b border-white/5 pb-5 z-10">
        <div>
          <span className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.25em] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Luxury QR Code Configurator
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 text-white">
            Branded Vector QR Code
          </h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer"
          >
            Close
          </button>
        )}
      </div>

      {/* LEFT COLUMN: LIVE PREMIUM PREVIEW */}
      <div className="col-span-1 md:col-span-5 flex flex-col items-center justify-center gap-6 z-10">
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] self-start md:self-center">
          Live Master Preview
        </p>

        {/* Outer Branded Preview Container with dynamic colors */}
        <div
          className="p-4 sm:p-8 rounded-3xl border transition-all duration-500 flex flex-col items-center justify-center aspect-square w-full max-w-[340px] shadow-2xl relative group overflow-hidden"
          style={{
            backgroundColor: bg,
            borderColor: `${fg}33`,
            boxShadow: `0 20px 40px -15px ${fg}20`,
          }}
        >
          {/* Accent corners on the preview box for luxury feel */}
          <div
            className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 opacity-40 transition-all duration-500"
            style={{ borderColor: fg }}
          />
          <div
            className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 opacity-40 transition-all duration-500"
            style={{ borderColor: fg }}
          />
          <div
            className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 opacity-40 transition-all duration-500"
            style={{ borderColor: fg }}
          />
          <div
            className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 opacity-40 transition-all duration-500"
            style={{ borderColor: fg }}
          />

          {/* DYNAMIC FRAMING STYLES */}
          <div
            className={`w-full h-full flex flex-col items-center justify-center relative transition-all duration-500 ${
              frameStyle === "minimal" ? "border-2 p-3 sm:p-4 rounded-2xl" : ""
            } ${frameStyle === "regal-ornate" ? "border-4 p-4 sm:p-5 rounded-2xl" : ""}`}
            style={{
              borderColor: frameStyle !== "none" ? fg : "transparent",
            }}
          >
            {/* Crown decoration in Ornate Frame */}
            {frameStyle === "regal-ornate" && (
              <span className="text-[10px] tracking-widest mb-1.5 sm:mb-2" style={{ color: fg }}>
                ✦ ✦ ✦
              </span>
            )}

            {/* Hidden canvas from qrcode.react to read pixels */}
            <div className="p-1 sm:p-2 bg-transparent rounded-xl">
              <QRCodeCanvas
                ref={qrCanvasRef}
                value={url}
                size={qrSize}
                bgColor={bg}
                fgColor={fg}
                level="H"
                includeMargin={false}
                imageSettings={getEmblemSettings()}
              />
            </div>

            {/* Bottom text styling inside the border */}
            {frameStyle === "minimal" && frameText && (
              <p
                className="text-[8px] sm:text-[9px] font-bold tracking-[0.25em] sm:tracking-[0.35em] mt-2 sm:mt-3 uppercase text-center"
                style={{ color: fg }}
              >
                {frameText}
              </p>
            )}

            {frameStyle === "regal-ornate" && frameText && (
              <p
                className="text-[9px] sm:text-[10px] font-serif font-bold tracking-[0.3em] sm:tracking-[0.4em] mt-2 sm:mt-3 uppercase text-center"
                style={{ color: fg }}
              >
                {frameText}
              </p>
            )}

            {/* Luxury Card Info inside layout */}
            {frameStyle === "luxury-card" && (
              <div className="mt-2 sm:mt-3.5 text-center w-full">
                <p
                  className="font-serif text-xs sm:text-sm font-bold tracking-tight truncate px-2"
                  style={{ color: fg }}
                >
                  {businessName}
                </p>
                {category && (
                  <p
                    className="text-[7px] sm:text-[8px] tracking-[0.2em] sm:tracking-[0.25em] font-semibold mt-0.5 uppercase opacity-70"
                    style={{ color: fg }}
                  >
                    {category}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick action controls for the live preview */}
        <div className="w-full max-w-[340px] flex flex-col gap-2.5">
          <button
            onClick={drawAndDownloadHighRes}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer border border-amber-400/20 hover:scale-[1.02]"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Download High-Res PNG</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopyLink}
              className="py-3 px-4 border border-white/5 bg-[#0F0F12]/80 hover:bg-white/5 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer text-slate-300 hover:text-white"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="py-3 px-4 border border-white/5 bg-[#0F0F12]/80 hover:bg-white/5 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Reset Style</span>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: CONFIGURATION PANEL */}
      <div className="col-span-1 md:col-span-7 flex flex-col gap-6 z-10">
        {/* SECTION 1: METALLIC COLORS */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" /> 1. Select Premium Color Preset
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {LUXURY_COLORS.map((color) => {
              const active = !useCustomColors && selectedColor.id === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => {
                    setUseCustomColors(false);
                    setSelectedColor(color);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all duration-300 relative ${
                    active
                      ? "border-amber-500 bg-white/5 text-white shadow-md shadow-amber-500/5"
                      : "border-white/5 hover:border-white/20 bg-white/[0.02] text-slate-400 hover:text-white"
                  } cursor-pointer`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/10 shrink-0"
                      style={{ backgroundColor: color.fgColor }}
                    />
                    <span className="text-xs font-bold truncate leading-tight">{color.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: FRAME PRESET */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Frame className="w-4 h-4 text-amber-500" /> 2. Select Frame Overlay
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FRAME_PRESETS.map((preset) => {
              const active = frameStyle === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setFrameStyle(preset.id)}
                  className={`py-3 px-4 rounded-xl border font-semibold text-xs transition-all duration-300 ${
                    active
                      ? "border-amber-500 bg-white/5 text-amber-400"
                      : "border-white/5 bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/10"
                  } cursor-pointer text-center truncate`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>

          {/* Frame text customizing */}
          {(frameStyle === "minimal" || frameStyle === "regal-ornate") && (
            <div className="pt-1.5 animate-fade-in">
              <input
                type="text"
                value={frameText}
                onChange={(e) => setFrameText(e.target.value)}
                maxLength={30}
                placeholder="Custom frame text"
                className="w-full bg-[#1A1A22] border border-white/10 text-xs px-4 py-3 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50"
              />
              <p className="text-[10px] text-slate-500 mt-1.5 pl-1 italic">
                Serif luxury display text rendered along the frame border (Max 30 chars).
              </p>
            </div>
          )}
        </div>

        {/* SECTION 3: EMBLEM TYPE */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <CircleDot className="w-4 h-4 text-amber-500" /> 3. Select Central Emblem
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {EMBLEM_PRESETS.map((preset) => {
              // Hide business logo option if no logo uploaded
              if (preset.id === "logo" && !logoUrl) return null;
              const active = emblemStyle === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setEmblemStyle(preset.id)}
                  className={`py-3 px-2 rounded-xl border font-bold text-[10px] uppercase tracking-wider transition-all duration-300 ${
                    active
                      ? "border-amber-500 bg-white/5 text-amber-400"
                      : "border-white/5 bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/10"
                  } cursor-pointer text-center truncate`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-500 pl-1">
            Enabling an emblem automatically adds an high-contrast luxury icon directly in the
            center of the QR code with safety pixel masking (excavation).
          </p>
        </div>

        {/* SECTION 4: CUSTOM BRAND COLORS (COLLAPSIBLE / OPTIONAL) */}
        <div className="border border-white/5 rounded-2xl p-4 bg-white/[0.01] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-300">Custom Branding Colors</p>
              <p className="text-[10px] text-slate-500">
                Fine-tune specific hex color combinations
              </p>
            </div>
            <button
              onClick={() => setUseCustomColors(!useCustomColors)}
              className={`px-3 py-1.5 border rounded-lg text-[10px] uppercase tracking-widest font-semibold transition-all ${
                useCustomColors
                  ? "border-amber-500 bg-amber-500/10 text-amber-400"
                  : "border-white/10 text-slate-400 hover:border-white/20"
              } cursor-pointer`}
            >
              {useCustomColors ? "Active" : "Enable"}
            </button>
          </div>

          {useCustomColors && (
            <div className="grid grid-cols-2 gap-4 pt-2 animate-fade-in">
              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">
                  Foreground/QR Code Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customFg}
                    onChange={(e) => setCustomFg(e.target.value)}
                    className="w-10 h-10 border border-white/10 rounded-lg cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={customFg}
                    onChange={(e) => setCustomFg(e.target.value)}
                    className="bg-[#1A1A22] border border-white/10 rounded-lg text-xs px-3 py-2 text-white focus:outline-none focus:border-amber-500/50 flex-1 font-mono uppercase"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customBg}
                    onChange={(e) => setCustomBg(e.target.value)}
                    className="w-10 h-10 border border-white/10 rounded-lg cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={customBg}
                    onChange={(e) => setCustomBg(e.target.value)}
                    className="bg-[#1A1A22] border border-white/10 rounded-lg text-xs px-3 py-2 text-white focus:outline-none focus:border-amber-500/50 flex-1 font-mono uppercase"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
