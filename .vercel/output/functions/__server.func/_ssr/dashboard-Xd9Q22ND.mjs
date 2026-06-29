import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DXjAb9eS.mjs";
import { i as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs--tanstack-react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { B as ChevronRight, F as ExternalLink, G as ArrowUpDown, H as Check, I as Download, J as Sparkles, L as Copy, M as Frame, U as CalendarDays, V as ChevronLeft, W as Award, X as ChartColumn, Y as PenLine, _ as QrCode, c as Trash2, g as RotateCcw, h as ScanLine, l as SlidersHorizontal, m as Search, r as Users, s as TrendingUp, v as Plus, z as CircleDot } from "../_libs/lucide-react.mjs";
import { i as generateQrDataUrl, t as buildClientUrl } from "./qr-kv4ZqdPQ.mjs";
import { t as QRCodeCanvas } from "../_libs/qrcode.react.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs-recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Xd9Q22ND.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/luxury-qr-code.tsx";
var LUXURY_COLORS = [
	{
		id: "imperial-gold",
		name: "Imperial Gold",
		fgColor: "#D4AF37",
		bgColor: "#0A0A0B",
		accentColor: "#F3E5AB",
		badgeBg: "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20"
	},
	{
		id: "platinum-silver",
		name: "Platinum Silver",
		fgColor: "#E5E4E2",
		bgColor: "#0A0A0B",
		accentColor: "#FFFFFF",
		badgeBg: "bg-white/10 text-white border-white/20"
	},
	{
		id: "emerald-noir",
		name: "Emerald Royal",
		fgColor: "#2EBD93",
		bgColor: "#061A13",
		accentColor: "#A7F3D0",
		badgeBg: "bg-[#2EBD93]/10 text-[#2EBD93] border-[#2EBD93]/20"
	},
	{
		id: "ruby-velvet",
		name: "Ruby Velvet",
		fgColor: "#B8324A",
		bgColor: "#140508",
		accentColor: "#FECDD3",
		badgeBg: "bg-[#B8324A]/10 text-[#B8324A] border-[#B8324A]/20"
	},
	{
		id: "champagne",
		name: "Champagne Rose",
		fgColor: "#E8C5A8",
		bgColor: "#1F1517",
		accentColor: "#FFE4E6",
		badgeBg: "bg-[#E8C5A8]/10 text-[#E8C5A8] border-[#E8C5A8]/20"
	},
	{
		id: "pure-onyx",
		name: "Onyx Minimalist",
		fgColor: "#111111",
		bgColor: "#FFFFFF",
		accentColor: "#555555",
		badgeBg: "bg-slate-900/10 text-slate-800 border-slate-900/10"
	}
];
var FRAME_PRESETS = [
	{
		id: "none",
		name: "Standard QR"
	},
	{
		id: "minimal",
		name: "Classic Border"
	},
	{
		id: "luxury-card",
		name: "Branded Card"
	},
	{
		id: "regal-ornate",
		name: "Regal Ornate"
	}
];
var EMBLEM_PRESETS = [
	{
		id: "none",
		name: "No Emblem"
	},
	{
		id: "crown",
		name: "Crown Emblem"
	},
	{
		id: "star",
		name: "Ornate Star"
	},
	{
		id: "monogram",
		name: "Serif Monogram"
	},
	{
		id: "logo",
		name: "Business Logo"
	}
];
function LuxuryQRCode({ url, businessName, logoUrl, category, onClose }) {
	const [selectedColor, setSelectedColor] = (0, import_react.useState)(LUXURY_COLORS[0]);
	const [frameStyle, setFrameStyle] = (0, import_react.useState)("minimal");
	const [emblemStyle, setEmblemStyle] = (0, import_react.useState)(logoUrl ? "logo" : "monogram");
	const [customFg, setCustomFg] = (0, import_react.useState)("#D4AF37");
	const [customBg, setCustomBg] = (0, import_react.useState)("#0A0A0B");
	const [useCustomColors, setUseCustomColors] = (0, import_react.useState)(false);
	const [frameText, setFrameText] = (0, import_react.useState)("SCAN TO DISCOVER");
	const [isCopied, setIsCopied] = (0, import_react.useState)(false);
	const [windowWidth, setWindowWidth] = (0, import_react.useState)(typeof window !== "undefined" ? window.innerWidth : 1200);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	const isMobile = windowWidth < 640;
	const qrSize = isMobile ? 150 : 220;
	const qrCanvasRef = (0, import_react.useRef)(null);
	(0, import_react.useRef)(null);
	const fg = useCustomColors ? customFg : selectedColor.fgColor;
	const bg = useCustomColors ? customBg : selectedColor.bgColor;
	const toBase64Svg = (svgString) => {
		try {
			return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgString)))}`;
		} catch (e) {
			return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
		}
	};
	const getCrownEmblemUrl = (color) => {
		return toBase64Svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M5 16h14a1 1 0 0 0 1-.764l2.5-10a1 1 0 0 0-1.562-1.01L17.5 7.114 13.062 2.232a1 1 0 0 0-1.124 0L7.5 7.114 4.062 4.226a1 1 0 0 0-1.562 1.01l2.5 10A1 1 0 0 0 5 16zm-3 2h20v2H2z"/></svg>`);
	};
	const getStarEmblemUrl = (color) => {
		return toBase64Svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`);
	};
	const getMonogramEmblemUrl = (char, textColor, backColor) => {
		return toBase64Svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><circle cx="50" cy="50" r="48" fill="${backColor}" stroke="${textColor}" stroke-width="4"/><text x="50" y="62" font-family="'Times New Roman', 'Playfair Display', 'Georgia', serif" font-size="46" font-weight="bold" fill="${textColor}" text-anchor="middle">${char.trim().toUpperCase().substring(0, 1) || "K"}</text></svg>`);
	};
	const getEmblemSettings = () => {
		if (emblemStyle === "none") return void 0;
		let src = "";
		if (emblemStyle === "crown") src = getCrownEmblemUrl(fg);
		else if (emblemStyle === "star") src = getStarEmblemUrl(fg);
		else if (emblemStyle === "monogram") src = getMonogramEmblemUrl(businessName, fg, bg);
		else if (emblemStyle === "logo" && logoUrl) src = logoUrl;
		else return;
		return {
			src,
			height: isMobile ? 30 : 44,
			width: isMobile ? 30 : 44,
			excavate: true,
			...src.startsWith("data:") ? {} : { crossOrigin: "anonymous" }
		};
	};
	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setIsCopied(true);
			toast.success("Profile link copied successfully");
			setTimeout(() => setIsCopied(false), 2e3);
		} catch {
			toast.error("Failed to copy profile link");
		}
	};
	const drawAndDownloadHighRes = () => {
		const qrCanvas = qrCanvasRef.current;
		if (!qrCanvas) return;
		const exportSize = 2048;
		const scale = exportSize / 512;
		const canvas = document.createElement("canvas");
		canvas.width = exportSize;
		canvas.height = exportSize;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.fillStyle = bg;
		ctx.fillRect(0, 0, exportSize, exportSize);
		const qrSize = exportSize * .65;
		const qrX = (exportSize - qrSize) / 2;
		const qrY = (exportSize - qrSize) / 2 - (frameStyle !== "none" ? 40 * scale : 0);
		ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);
		if (frameStyle === "minimal") {
			ctx.strokeStyle = fg;
			ctx.lineWidth = 4 * scale;
			const borderPadding = 30 * scale;
			ctx.strokeRect(qrX - borderPadding, qrY - borderPadding, 1571.2, 1571.2 + (frameText ? 50 * scale : 0));
			if (frameText) {
				ctx.fillStyle = fg;
				ctx.font = `bold ${14 * scale}px 'Inter', sans-serif`;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.letterSpacing = "6px";
				ctx.fillText(frameText.toUpperCase(), exportSize / 2, qrY + qrSize + borderPadding + 15 * scale);
			}
		} else if (frameStyle === "luxury-card") {
			ctx.strokeStyle = fg;
			ctx.lineWidth = 2 * scale;
			const pad = 40 * scale;
			ctx.strokeRect(pad, pad, exportSize - pad * 2, exportSize - pad * 2);
			ctx.lineWidth = 1 * scale;
			ctx.strokeRect(192, 192, exportSize - 384, exportSize - 384);
			ctx.fillStyle = fg;
			ctx.textAlign = "center";
			ctx.font = `italic bold ${24 * scale}px 'Georgia', serif`;
			ctx.fillText(businessName, exportSize / 2, qrY + qrSize + 60 * scale);
			if (category) {
				ctx.font = `${11 * scale}px 'Inter', sans-serif`;
				ctx.letterSpacing = "4px";
				ctx.fillStyle = `${fg}99`;
				ctx.fillText(category.toUpperCase(), exportSize / 2, qrY + qrSize + 90 * scale);
			}
			ctx.fillStyle = fg;
			ctx.font = `${14 * scale}px 'Inter', sans-serif`;
			ctx.fillText("✦  ✦  ✦", exportSize / 2, qrY - 40 * scale);
		} else if (frameStyle === "regal-ornate") {
			ctx.strokeStyle = fg;
			ctx.lineWidth = 5 * scale;
			const borderPadding = 45 * scale;
			const startX = qrX - borderPadding;
			const startY = qrY - borderPadding;
			const w = 1691.2;
			const h = 1691.2 + (frameText ? 40 * scale : 0);
			ctx.strokeRect(startX, startY, w, h);
			ctx.lineWidth = 1.5 * scale;
			ctx.strokeRect(210.39999999999998, startY + 8 * scale, w - 16 * scale, h - 16 * scale);
			const offset = 24 * scale;
			ctx.fillStyle = fg;
			const drawCornerAccent = (x, y, rX, rY) => {
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(x + rX, y);
				ctx.lineTo(x, y + rY);
				ctx.closePath();
				ctx.fill();
			};
			drawCornerAccent(226.39999999999998, startY + 12 * scale, offset, offset);
			drawCornerAccent(1869.6 - 12 * scale, startY + 12 * scale, -96, offset);
			drawCornerAccent(226.39999999999998, startY + h - 12 * scale, offset, -96);
			drawCornerAccent(1869.6 - 12 * scale, startY + h - 12 * scale, -96, -96);
			if (frameText) {
				ctx.fillStyle = fg;
				ctx.font = `bold ${15 * scale}px 'Georgia', serif`;
				ctx.textAlign = "center";
				ctx.letterSpacing = "8px";
				ctx.fillText(frameText.toUpperCase(), exportSize / 2, startY + h - 22 * scale);
			}
		}
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "bg-[#0F0F12]/95 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-white relative shadow-2xl backdrop-blur-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 349,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 350,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "md:col-span-12 flex items-center justify-between border-b border-white/5 pb-5 z-10",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-[10px] text-amber-500 font-bold uppercase tracking-[0.25em] flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "w-3.5 h-3.5 animate-pulse" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 356,
						columnNumber: 13
					}, this), " Luxury QR Code Configurator"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 355,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl sm:text-2xl font-bold tracking-tight mt-1 text-white",
					children: "Branded Vector QR Code"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 358,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 354,
					columnNumber: 9
				}, this), onClose && /* @__PURE__ */ (void 0)("button", {
					onClick: onClose,
					className: "p-2 border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer",
					children: "Close"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 363,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 353,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "col-span-1 md:col-span-5 flex flex-col items-center justify-center gap-6 z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] self-start md:self-center",
						children: "Live Master Preview"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 374,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 sm:p-8 rounded-3xl border transition-all duration-500 flex flex-col items-center justify-center aspect-square w-full max-w-[340px] shadow-2xl relative group overflow-hidden",
						style: {
							backgroundColor: bg,
							borderColor: `${fg}33`,
							boxShadow: `0 20px 40px -15px ${fg}20`
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 opacity-40 transition-all duration-500",
								style: { borderColor: fg }
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 388,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 opacity-40 transition-all duration-500",
								style: { borderColor: fg }
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 392,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 opacity-40 transition-all duration-500",
								style: { borderColor: fg }
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 396,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 opacity-40 transition-all duration-500",
								style: { borderColor: fg }
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 400,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: `w-full h-full flex flex-col items-center justify-center relative transition-all duration-500 ${frameStyle === "minimal" ? "border-2 p-3 sm:p-4 rounded-2xl" : ""} ${frameStyle === "regal-ornate" ? "border-4 p-4 sm:p-5 rounded-2xl" : ""}`,
								style: { borderColor: frameStyle !== "none" ? fg : "transparent" },
								children: [
									frameStyle === "regal-ornate" && /* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] tracking-widest mb-1.5 sm:mb-2",
										style: { color: fg },
										children: "✦ ✦ ✦"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 416,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "p-1 sm:p-2 bg-transparent rounded-xl",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QRCodeCanvas, {
											ref: qrCanvasRef,
											value: url,
											size: qrSize,
											bgColor: bg,
											fgColor: fg,
											level: "H",
											includeMargin: false,
											imageSettings: getEmblemSettings()
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 423,
											columnNumber: 15
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 422,
										columnNumber: 13
									}, this),
									frameStyle === "minimal" && frameText && /* @__PURE__ */ (void 0)("p", {
										className: "text-[8px] sm:text-[9px] font-bold tracking-[0.25em] sm:tracking-[0.35em] mt-2 sm:mt-3 uppercase text-center",
										style: { color: fg },
										children: frameText
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 437,
										columnNumber: 15
									}, this),
									frameStyle === "regal-ornate" && frameText && /* @__PURE__ */ (void 0)("p", {
										className: "text-[9px] sm:text-[10px] font-serif font-bold tracking-[0.3em] sm:tracking-[0.4em] mt-2 sm:mt-3 uppercase text-center",
										style: { color: fg },
										children: frameText
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 446,
										columnNumber: 15
									}, this),
									frameStyle === "luxury-card" && /* @__PURE__ */ (void 0)("div", {
										className: "mt-2 sm:mt-3.5 text-center w-full",
										children: [/* @__PURE__ */ (void 0)("p", {
											className: "font-serif text-xs sm:text-sm font-bold tracking-tight truncate px-2",
											style: { color: fg },
											children: businessName
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 457,
											columnNumber: 17
										}, this), category && /* @__PURE__ */ (void 0)("p", {
											className: "text-[7px] sm:text-[8px] tracking-[0.2em] sm:tracking-[0.25em] font-semibold mt-0.5 uppercase opacity-70",
											style: { color: fg },
											children: category
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 464,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 456,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 406,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 379,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-full max-w-[340px] flex flex-col gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: drawAndDownloadHighRes,
							className: "w-full py-3.5 px-6 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer border border-amber-400/20 hover:scale-[1.02]",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "w-4 h-4 stroke-[2.5]" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 482,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Download High-Res PNG" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 483,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 478,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: handleCopyLink,
								className: "py-3 px-4 border border-white/5 bg-[#0F0F12]/80 hover:bg-white/5 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer text-slate-300 hover:text-white",
								children: isCopied ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 493,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-emerald-400",
									children: "Copied!"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 494,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 492,
									columnNumber: 17
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "w-4 h-4 text-slate-400" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 498,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Copy Link" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 499,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 497,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 487,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: handleReset,
								className: "py-3 px-4 border border-white/5 bg-[#0F0F12]/80 hover:bg-white/5 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "w-4 h-4 text-slate-500" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 508,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Reset Style" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 509,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 504,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 486,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 477,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 373,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "col-span-1 md:col-span-7 flex flex-col gap-6 z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Award, { className: "w-4 h-4 text-amber-500" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 520,
								columnNumber: 13
							}, this), " 1. Select Premium Color Preset"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 519,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
							children: LUXURY_COLORS.map((color) => {
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => {
										setUseCustomColors(false);
										setSelectedColor(color);
									},
									className: `p-3 rounded-xl border text-left transition-all duration-300 relative ${!useCustomColors && selectedColor.id === color.id ? "border-amber-500 bg-white/5 text-white shadow-md shadow-amber-500/5" : "border-white/5 hover:border-white/20 bg-white/[0.02] text-slate-400 hover:text-white"} cursor-pointer`,
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "w-3.5 h-3.5 rounded-full border border-white/10 shrink-0",
											style: { backgroundColor: color.fgColor }
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 539,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs font-bold truncate leading-tight",
											children: color.name
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 543,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 538,
										columnNumber: 19
									}, this)
								}, color.id, false, {
									fileName: _jsxFileName$1,
									lineNumber: 526,
									columnNumber: 17
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 522,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 518,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Frame, { className: "w-4 h-4 text-amber-500" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 554,
									columnNumber: 13
								}, this), " 2. Select Frame Overlay"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 553,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
								children: FRAME_PRESETS.map((preset) => {
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => setFrameStyle(preset.id),
										className: `py-3 px-4 rounded-xl border font-semibold text-xs transition-all duration-300 ${frameStyle === preset.id ? "border-amber-500 bg-white/5 text-amber-400" : "border-white/5 bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/10"} cursor-pointer text-center truncate`,
										children: preset.name
									}, preset.id, false, {
										fileName: _jsxFileName$1,
										lineNumber: 560,
										columnNumber: 17
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 556,
								columnNumber: 11
							}, this),
							(frameStyle === "minimal" || frameStyle === "regal-ornate") && /* @__PURE__ */ (void 0)("div", {
								className: "pt-1.5 animate-fade-in",
								children: [/* @__PURE__ */ (void 0)("input", {
									type: "text",
									value: frameText,
									onChange: (e) => setFrameText(e.target.value),
									maxLength: 30,
									placeholder: "Custom frame text",
									className: "w-full bg-[#1A1A22] border border-white/10 text-xs px-4 py-3 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 578,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-[10px] text-slate-500 mt-1.5 pl-1 italic",
									children: "Serif luxury display text rendered along the frame border (Max 30 chars)."
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 586,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 577,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 552,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleDot, { className: "w-4 h-4 text-amber-500" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 596,
									columnNumber: 13
								}, this), " 3. Select Central Emblem"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 595,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-2 sm:grid-cols-5 gap-2.5",
								children: EMBLEM_PRESETS.map((preset) => {
									if (preset.id === "logo" && !logoUrl) return null;
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => setEmblemStyle(preset.id),
										className: `py-3 px-2 rounded-xl border font-bold text-[10px] uppercase tracking-wider transition-all duration-300 ${emblemStyle === preset.id ? "border-amber-500 bg-white/5 text-amber-400" : "border-white/5 bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/10"} cursor-pointer text-center truncate`,
										children: preset.name
									}, preset.id, false, {
										fileName: _jsxFileName$1,
										lineNumber: 604,
										columnNumber: 17
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 598,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[10px] text-slate-500 pl-1",
								children: "Enabling an emblem automatically adds an high-contrast luxury icon directly in the center of the QR code with safety pixel masking (excavation)."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 618,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 594,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-white/5 rounded-2xl p-4 bg-white/[0.01] space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-bold text-slate-300",
								children: "Custom Branding Colors"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 628,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[10px] text-slate-500",
								children: "Fine-tune specific hex color combinations"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 629,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 627,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setUseCustomColors(!useCustomColors),
								className: `px-3 py-1.5 border rounded-lg text-[10px] uppercase tracking-widest font-semibold transition-all ${useCustomColors ? "border-amber-500 bg-amber-500/10 text-amber-400" : "border-white/10 text-slate-400 hover:border-white/20"} cursor-pointer`,
								children: useCustomColors ? "Active" : "Enable"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 633,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 626,
							columnNumber: 11
						}, this), useCustomColors && /* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-2 gap-4 pt-2 animate-fade-in",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (void 0)("label", {
									className: "text-[10px] text-slate-400 uppercase tracking-widest font-bold block",
									children: "Foreground/QR Code Color"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 648,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)("input", {
										type: "color",
										value: customFg,
										onChange: (e) => setCustomFg(e.target.value),
										className: "w-10 h-10 border border-white/10 rounded-lg cursor-pointer bg-transparent"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 652,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: customFg,
										onChange: (e) => setCustomFg(e.target.value),
										className: "bg-[#1A1A22] border border-white/10 rounded-lg text-xs px-3 py-2 text-white focus:outline-none focus:border-amber-500/50 flex-1 font-mono uppercase"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 658,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 651,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 647,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (void 0)("label", {
									className: "text-[10px] text-slate-400 uppercase tracking-widest font-bold block",
									children: "Background Color"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 668,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)("input", {
										type: "color",
										value: customBg,
										onChange: (e) => setCustomBg(e.target.value),
										className: "w-10 h-10 border border-white/10 rounded-lg cursor-pointer bg-transparent"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 672,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: customBg,
										onChange: (e) => setCustomBg(e.target.value),
										className: "bg-[#1A1A22] border border-white/10 rounded-lg text-xs px-3 py-2 text-white focus:outline-none focus:border-amber-500/50 flex-1 font-mono uppercase"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 678,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 671,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 667,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 646,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 625,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 516,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 347,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/_authenticated/dashboard.tsx?tsr-split=component";
function formatUserAgent(ua) {
	if (!ua) return "Unknown device";
	const lower = ua.toLowerCase();
	if (lower.includes("iphone")) return "iPhone Visitor";
	if (lower.includes("ipad")) return "iPad Visitor";
	if (lower.includes("android")) return "Android Visitor";
	if (lower.includes("macintosh")) return "Mac Visitor";
	if (lower.includes("windows")) return "Windows Visitor";
	if (lower.includes("linux")) return "Linux Visitor";
	return "Mobile/Desktop";
}
function extractStoragePath(url) {
	if (!url) return null;
	try {
		const parts = url.split("/client-assets/");
		if (parts.length > 1) return parts[1].split("?")[0];
	} catch (e) {
		console.error("Failed to parse URL:", url, e);
	}
	return null;
}
function Dashboard() {
	const [clients, setClients] = (0, import_react.useState)([]);
	const [scanCounts, setScanCounts] = (0, import_react.useState)({});
	const [recentActivity, setRecentActivity] = (0, import_react.useState)([]);
	const [q, setQ] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [qrOpen, setQrOpen] = (0, import_react.useState)(null);
	const [qrData, setQrData] = (0, import_react.useState)(null);
	const [deletingId, setDeletingId] = (0, import_react.useState)(null);
	const [clientToDelete, setClientToDelete] = (0, import_react.useState)(null);
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
	const [sortBy, setSortBy] = (0, import_react.useState)("newest");
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const [pageSize, setPageSize] = (0, import_react.useState)(5);
	const [stats, setStats] = (0, import_react.useState)({
		today: 0,
		sevenDays: 0,
		thirtyDays: 0,
		uniqueVisitors: 0
	});
	const [chartData, setChartData] = (0, import_react.useState)([]);
	async function load() {
		setLoading(true);
		try {
			const { data: clientsData, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
			if (error) {
				toast.error(`Error loading clients: ${error.message}`);
				setClients([]);
			} else setClients(clientsData ?? []);
			const { data: scans, error: scansError } = await supabase.from("qr_scans").select("client_id, scanned_at, user_agent");
			if (scansError) console.error("Error loading scans:", scansError);
			const counts = {};
			let today = 0;
			let sevenDays = 0;
			let thirtyDays = 0;
			const now = /* @__PURE__ */ new Date();
			const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
			const sevenDaysAgo = now.getTime() - 10080 * 60 * 1e3;
			const thirtyDaysAgo = now.getTime() - 720 * 60 * 60 * 1e3;
			const scansTimes = scans;
			const uniqueVisitsSet = /* @__PURE__ */ new Set();
			(scansTimes ?? []).forEach((s) => {
				counts[s.client_id] = (counts[s.client_id] ?? 0) + 1;
				const time = new Date(s.scanned_at).getTime();
				if (time >= startOfToday) today++;
				if (time >= sevenDaysAgo) sevenDays++;
				if (time >= thirtyDaysAgo) thirtyDays++;
				const uniqueKey = `${s.client_id}_${s.user_agent || "unknown"}`;
				uniqueVisitsSet.add(uniqueKey);
			});
			setScanCounts(counts);
			setStats({
				today,
				sevenDays,
				thirtyDays,
				uniqueVisitors: uniqueVisitsSet.size
			});
			const tempChartData = {};
			for (let i = 6; i >= 0; i--) {
				const d = /* @__PURE__ */ new Date();
				d.setDate(d.getDate() - i);
				const label = d.toLocaleDateString([], {
					month: "short",
					day: "numeric"
				});
				tempChartData[label] = 0;
			}
			(scansTimes ?? []).forEach((s) => {
				const label = new Date(s.scanned_at).toLocaleDateString([], {
					month: "short",
					day: "numeric"
				});
				if (tempChartData[label] !== void 0) tempChartData[label]++;
			});
			setChartData(Object.entries(tempChartData).map(([name, Scans]) => ({
				name,
				Scans
			})));
			const { data: activity } = await supabase.from("qr_scans").select("*, clients(business_name, logo_url, slug)").order("scanned_at", { ascending: false }).limit(10);
			setRecentActivity(activity ?? []);
		} catch (err) {
			console.error("Dashboard load failure:", err);
			toast.error("Failed to load dashboard statistics.");
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	(0, import_react.useEffect)(() => {
		setCurrentPage(1);
	}, [q, categoryFilter]);
	(0, import_react.useEffect)(() => {
		if (!qrOpen) {
			setQrData(null);
			return;
		}
		generateQrDataUrl(buildClientUrl(qrOpen.slug)).then(setQrData);
	}, [qrOpen]);
	async function remove(id, name) {
		if (deletingId) return;
		setDeletingId(id);
		try {
			const { data: client, error: fetchError } = await supabase.from("clients").select("logo_url, cover_url, pdf_url, gallery").eq("id", id).maybeSingle();
			if (fetchError) console.error("Error fetching client details before deletion:", fetchError);
			const filesToDelete = [];
			if (client) {
				const logoPath = extractStoragePath(client.logo_url);
				if (logoPath) filesToDelete.push(logoPath);
				const coverPath = extractStoragePath(client.cover_url);
				if (coverPath) filesToDelete.push(coverPath);
				const pdfPath = extractStoragePath(client.pdf_url);
				if (pdfPath) filesToDelete.push(pdfPath);
				if (client.gallery) try {
					const galleryUrls = Array.isArray(client.gallery) ? client.gallery : JSON.parse(client.gallery);
					if (Array.isArray(galleryUrls)) galleryUrls.forEach((url) => {
						const path = extractStoragePath(url);
						if (path) filesToDelete.push(path);
					});
				} catch (e) {
					console.error("Error parsing gallery urls for deletion:", e);
				}
			}
			if (filesToDelete.length > 0) {
				const { error: storageError } = await supabase.storage.from("client-assets").remove(filesToDelete);
				if (storageError) console.error("Failed to delete assets from storage:", storageError);
				else console.log("Deleted client assets from storage:", filesToDelete);
			}
			const { error: scansError } = await supabase.from("qr_scans").delete().eq("client_id", id);
			if (scansError) console.error("Failed to delete related scan records:", scansError);
			const { error: deleteError } = await supabase.from("clients").delete().eq("id", id);
			if (deleteError) throw deleteError;
			toast.success(`Client "${name}" was successfully deleted.`);
			setClientToDelete(null);
			await load();
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Deletion failed";
			toast.error(`Could not delete client: ${msg}`);
			console.error("Delete client error:", err);
		} finally {
			setDeletingId(null);
		}
	}
	let processed = clients.filter((c) => {
		const matchesSearch = !q || c.business_name.toLowerCase().includes(q.toLowerCase()) || c.slug.toLowerCase().includes(q.toLowerCase());
		const matchesCategory = categoryFilter === "all" || c.category === categoryFilter;
		return matchesSearch && matchesCategory;
	});
	processed = [...processed].sort((a, b) => {
		if (sortBy === "name_asc") return a.business_name.localeCompare(b.business_name);
		if (sortBy === "name_desc") return b.business_name.localeCompare(a.business_name);
		if (sortBy === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
		if (sortBy === "scans_desc") {
			const scansA = scanCounts[a.id] ?? 0;
			return (scanCounts[b.id] ?? 0) - scansA;
		}
		if (sortBy === "scans_asc") return (scanCounts[a.id] ?? 0) - (scanCounts[b.id] ?? 0);
		return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
	});
	const totalClients = clients.length;
	const totalQrs = clients.length;
	const totalScans = Object.values(scanCounts).reduce((a, b) => a + b, 0);
	const totalItems = processed.length;
	const totalPages = Math.ceil(totalItems / pageSize) || 1;
	const startIndex = (currentPage - 1) * pageSize;
	const paginatedClients = processed.slice(startIndex, startIndex + pageSize);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold",
					children: "Management Console"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 298,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl font-bold text-white tracking-tight mt-1",
					children: "Clients Overview"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 301,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 297,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/clients/new",
					className: "bg-gradient-to-r from-amber-400 to-amber-600 text-black px-5 py-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:from-amber-500 hover:to-amber-700 transition-all flex items-center gap-2 rounded-xl shadow-lg shadow-amber-500/10 cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5 stroke-[2.5]" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 304,
						columnNumber: 11
					}, this), " Add Client"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 303,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 296,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-4 text-amber-500" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 310,
							columnNumber: 25
						}, this),
						label: "Total Clients",
						value: totalClients,
						trend: `${totalQrs} Active QRs`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 310,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartColumn, { className: "size-4 text-emerald-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 311,
							columnNumber: 25
						}, this),
						label: "Total Visitors",
						value: totalScans,
						trend: "Total Scans"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 311,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScanLine, { className: "size-4 text-indigo-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 312,
							columnNumber: 25
						}, this),
						label: "Unique Visitors",
						value: stats.uniqueVisitors,
						trend: "Distinct Scans"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 312,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "size-4 text-teal-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 313,
							columnNumber: 25
						}, this),
						label: "Today",
						value: stats.today,
						trend: "Live Scans"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 313,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarDays, { className: "size-4 text-sky-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 314,
							columnNumber: 25
						}, this),
						label: "Last 7 Days",
						value: stats.sevenDays,
						trend: "Weekly Scans"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 314,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarDays, { className: "size-4 text-violet-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 315,
							columnNumber: 25
						}, this),
						label: "Last 30 Days",
						value: stats.thirtyDays,
						trend: "Monthly Scans"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 315,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 309,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-[#0F0F12]/90 rounded-[2rem] border border-white/5 p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-sm font-bold text-white tracking-widest uppercase",
						children: "Visitor Traffic"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 322,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-slate-500 mt-1",
						children: "QR code scan trends over the last 7 days"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 325,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 321,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-block size-2 rounded-full bg-amber-500 animate-pulse" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 328,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[10px] text-amber-500 font-bold uppercase tracking-widest",
							children: "Live updates"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 329,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 327,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 320,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "h-64 w-full",
					children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "size-full flex items-center justify-center text-white/20 text-xs font-mono tracking-widest uppercase animate-pulse",
						children: "Generating Analytics Chart..."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 336,
						columnNumber: 22
					}, this) : chartData.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "size-full flex items-center justify-center text-slate-600 text-xs italic",
						children: "No traffic scans recorded."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 338,
						columnNumber: 47
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AreaChart, {
							data: chartData,
							margin: {
								top: 10,
								right: 10,
								left: -20,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("defs", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
									id: "colorScans",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
										offset: "5%",
										stopColor: "#D4AF37",
										stopOpacity: .4
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 349,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
										offset: "95%",
										stopColor: "#D4AF37",
										stopOpacity: 0
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 350,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 348,
									columnNumber: 19
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 347,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "rgba(255, 255, 255, 0.05)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 353,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, {
									dataKey: "name",
									stroke: "rgba(255, 255, 255, 0.4)",
									fontSize: 10,
									fontFamily: "monospace",
									tickLine: false
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 354,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {
									stroke: "rgba(255, 255, 255, 0.4)",
									fontSize: 10,
									fontFamily: "monospace",
									tickLine: false,
									axisLine: false,
									allowDecimals: false
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 355,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, {
									contentStyle: {
										backgroundColor: "#0F0F12",
										borderColor: "rgba(212,175,55,0.3)",
										borderRadius: "12px",
										color: "#fff",
										fontFamily: "sans-serif",
										fontSize: "12px"
									},
									itemStyle: {
										color: "#D4AF37",
										fontWeight: "bold"
									},
									labelStyle: {
										color: "rgba(255,255,255,0.5)",
										fontSize: "10px"
									}
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 356,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Area, {
									type: "monotone",
									dataKey: "Scans",
									stroke: "#D4AF37",
									strokeWidth: 2,
									fillOpacity: 1,
									fill: "url(#colorScans)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 370,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 341,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 340,
						columnNumber: 22
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 335,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 319,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid lg:grid-cols-[1fr_350px] gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 383,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Search clients by name or slug…",
								className: "w-full bg-[#0F0F12]/80 border border-white/5 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none transition-all rounded-xl shadow-inner"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 384,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 382,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2 bg-[#0F0F12]/80 border border-white/5 px-4 py-2.5 rounded-xl text-sm text-slate-400",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersHorizontal, { className: "size-3.5 text-amber-500" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 391,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs uppercase tracking-wider font-semibold",
											children: "Category:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 392,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
											value: categoryFilter,
											onChange: (e) => setCategoryFilter(e.target.value),
											className: "bg-transparent text-white focus:outline-none cursor-pointer text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "all",
												className: "bg-neutral-950 text-white",
												children: "All Categories"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 394,
												columnNumber: 19
											}, this), [
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
												"Other"
											].map((cat) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: cat,
												className: "bg-neutral-950 text-white",
												children: cat
											}, cat, false, {
												fileName: _jsxFileName,
												lineNumber: 397,
												columnNumber: 227
											}, this))]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 393,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 390,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2 bg-[#0F0F12]/80 border border-white/5 px-4 py-2.5 rounded-xl text-sm text-slate-400",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpDown, { className: "size-3.5 text-amber-500" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 405,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs uppercase tracking-wider font-semibold",
											children: "Sort By:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 406,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
											value: sortBy,
											onChange: (e) => setSortBy(e.target.value),
											className: "bg-transparent text-white focus:outline-none cursor-pointer text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "newest",
													className: "bg-neutral-950 text-white",
													children: "Newest Created"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 408,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "oldest",
													className: "bg-neutral-950 text-white",
													children: "Oldest Created"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 411,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "name_asc",
													className: "bg-neutral-950 text-white",
													children: "Business Name (A-Z)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 414,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "name_desc",
													className: "bg-neutral-950 text-white",
													children: "Business Name (Z-A)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 417,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "scans_desc",
													className: "bg-neutral-950 text-white",
													children: "Most Visited"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 420,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "scans_asc",
													className: "bg-neutral-950 text-white",
													children: "Least Visited"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 423,
													columnNumber: 19
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 407,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 404,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2 bg-[#0F0F12]/80 border border-white/5 px-4 py-2.5 rounded-xl text-sm text-slate-400 sm:ml-auto",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs uppercase tracking-wider font-semibold text-slate-500",
										children: "Show:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 431,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
										value: pageSize,
										onChange: (e) => {
											setPageSize(Number(e.target.value));
											setCurrentPage(1);
										},
										className: "bg-transparent text-white focus:outline-none cursor-pointer text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: 5,
												className: "bg-neutral-950 text-white",
												children: "5 Profiles"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 438,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: 10,
												className: "bg-neutral-950 text-white",
												children: "10 Profiles"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 441,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: 20,
												className: "bg-neutral-950 text-white",
												children: "20 Profiles"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 444,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: 50,
												className: "bg-neutral-950 text-white",
												children: "50 Profiles"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 447,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 434,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 430,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 388,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 380,
						columnNumber: 11
					}, this), loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: [
							1,
							2,
							3
						].map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "border border-white/5 bg-[#0F0F12]/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 animate-pulse",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-4 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-12 rounded-full bg-white/5 border border-white/5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 458,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2 flex-1 max-w-[200px]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-4 bg-white/10 rounded w-3/4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 460,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-3 bg-white/5 rounded w-1/2" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 461,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 459,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 457,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 sm:ml-auto justify-end",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-6 w-16 bg-white/5 rounded-full" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 465,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-9 bg-white/5 rounded-lg" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 466,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-9 bg-white/5 rounded-lg" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 467,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-9 bg-white/5 rounded-lg" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 468,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-9 bg-white/5 rounded-lg" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 469,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 464,
								columnNumber: 19
							}, this)]
						}, n, true, {
							fileName: _jsxFileName,
							lineNumber: 456,
							columnNumber: 35
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 455,
						columnNumber: 22
					}, this) : paginatedClients.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-center py-16 px-6 border border-dashed border-amber-500/20 bg-amber-500/5 rounded-[2rem] space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "size-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-8 text-amber-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 474,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 473,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-lg font-serif text-white",
								children: clients.length === 0 ? "No Premium Profiles Yet" : "No Match Found"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 477,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-slate-500 mt-1.5 max-w-sm mx-auto",
								children: clients.length === 0 ? "Establish your luxury client portfolio. Create dynamic, luxury-themed business profiles with bespoke high-resolution QR codes." : "No clients match your current search queries or filters. Try adjusting your category or search term."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 480,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 476,
								columnNumber: 15
							}, this),
							clients.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/clients/new",
								className: "inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5 stroke-[2.5]" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 485,
									columnNumber: 19
								}, this), " Create First Client Profile"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 484,
								columnNumber: 39
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => {
									setQ("");
									setCategoryFilter("all");
								},
								className: "px-4 py-2 border border-white/10 hover:border-white/30 text-white rounded-xl text-xs uppercase tracking-wider font-semibold bg-white/5 transition-all cursor-pointer",
								children: "Clear Filters"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 486,
								columnNumber: 27
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 472,
						columnNumber: 54
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "space-y-3",
							children: paginatedClients.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
								className: "group border border-white/5 bg-[#0F0F12]/40 hover:border-amber-500/30 transition-all duration-300 rounded-2xl hover:bg-[#0F0F12]/80 overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-col sm:flex-row sm:items-center gap-4 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex min-w-0 items-center gap-4 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "shrink-0 size-12 rounded-full border border-amber-500/30 overflow-hidden bg-black flex items-center justify-center",
											children: c.logo_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
												src: c.logo_url,
												alt: "",
												className: "size-full object-cover"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 498,
												columnNumber: 41
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "size-full grid place-items-center text-amber-500/40 text-[10px]",
												children: "★"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 498,
												columnNumber: 110
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 497,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
												className: "font-serif text-lg text-white truncate group-hover:text-amber-400 transition-colors",
												children: c.business_name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 503,
												columnNumber: 27
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-[11px] text-white/40 truncate font-mono",
												children: ["/c/", c.slug]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 506,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 502,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 496,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2 sm:ml-auto shrink-0 justify-end",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-amber-500 border border-amber-500/20 px-2.5 py-1 rounded-full bg-amber-500/5",
												title: "Unique visits counter",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-3" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 513,
														columnNumber: 27
													}, this),
													" ",
													scanCounts[c.id] ?? 0
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 512,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBtn, {
												onClick: () => setQrOpen(c),
												title: "QR Code",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QrCode, { className: "size-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 516,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 515,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBtn, {
												as: Link,
												to: "/c/$slug",
												params: { slug: c.slug },
												target: "_blank",
												title: "View profile page",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 521,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 518,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBtn, {
												as: Link,
												to: "/clients/$id",
												params: { id: c.id },
												title: "Edit profile details",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PenLine, { className: "size-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 526,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 523,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBtn, {
												onClick: () => setClientToDelete({
													id: c.id,
													name: c.business_name
												}),
												title: "Delete client profile",
												danger: true,
												disabled: deletingId !== null,
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 532,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 528,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 511,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 495,
									columnNumber: 21
								}, this)
							}, c.id, false, {
								fileName: _jsxFileName,
								lineNumber: 494,
								columnNumber: 44
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 493,
							columnNumber: 15
						}, this), totalPages > 1 && /* @__PURE__ */ (void 0)("div", {
							className: "flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "text-xs text-slate-500",
								children: [
									"Showing ",
									/* @__PURE__ */ (void 0)("span", {
										className: "text-white font-medium",
										children: startIndex + 1
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 542,
										columnNumber: 29
									}, this),
									" to",
									" ",
									/* @__PURE__ */ (void 0)("span", {
										className: "text-white font-medium",
										children: Math.min(startIndex + pageSize, totalItems)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 543,
										columnNumber: 21
									}, this),
									" ",
									"of ",
									/* @__PURE__ */ (void 0)("span", {
										className: "text-white font-medium",
										children: totalItems
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 546,
										columnNumber: 24
									}, this),
									" clients"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 541,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (void 0)("button", {
										onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
										disabled: currentPage === 1,
										className: "p-2 border border-white/10 hover:border-amber-500/30 rounded-xl bg-white/5 text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer",
										title: "Previous Page",
										children: /* @__PURE__ */ (void 0)(ChevronLeft, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 550,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 549,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "text-xs font-mono text-slate-400",
										children: [
											"Page ",
											/* @__PURE__ */ (void 0)("span", {
												className: "text-amber-500 font-bold",
												children: currentPage
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 553,
												columnNumber: 28
											}, this),
											" of",
											" ",
											/* @__PURE__ */ (void 0)("span", { children: totalPages }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 554,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 552,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
										disabled: currentPage === totalPages,
										className: "p-2 border border-white/10 hover:border-amber-500/30 rounded-xl bg-white/5 text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer",
										title: "Next Page",
										children: /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 557,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 556,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 548,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 540,
							columnNumber: 34
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 492,
						columnNumber: 22
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 379,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-[#0F0F12] rounded-[2rem] border border-white/5 p-6 flex flex-col gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-xs font-bold text-white tracking-widest uppercase",
							children: "Quick Actions"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 568,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/clients/new",
								className: "w-full py-4 px-5 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 rounded-2xl flex items-center justify-between group shadow-xl shadow-amber-900/20 text-black cursor-pointer transition-all duration-300 font-bold text-xs uppercase",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "New Client Profile" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 573,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "w-4 h-4 text-black group-hover:scale-110 transition-transform stroke-[2.5]" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 574,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 572,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: "/",
								target: "_blank",
								className: "w-full py-4 px-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-between transition-colors text-white",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-bold uppercase",
									children: "View Public Site"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 578,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "w-4 h-4 text-slate-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 579,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 577,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 571,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 567,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-[#0F0F12] rounded-[2rem] border border-white/5 p-6 flex flex-col gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-xs font-bold text-white tracking-widest uppercase",
							children: "Recent Activity"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 586,
							columnNumber: 13
						}, this), recentActivity.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-slate-500 italic",
							children: "No activity detected yet."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 589,
							columnNumber: 44
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4",
							children: recentActivity.map((activity) => {
								const clientName = activity.clients?.business_name ?? "Deleted client";
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex gap-3 text-xs border-b border-white/5 pb-3.5 last:border-0 last:pb-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "size-8 rounded-full bg-amber-500/5 border border-amber-500/20 flex items-center justify-center text-[10px] text-amber-500 shrink-0 overflow-hidden",
										children: activity.clients?.logo_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
											src: activity.clients.logo_url,
											alt: "",
											className: "size-full object-cover"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 594,
											columnNumber: 55
										}, this) : "★"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 593,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-white/80 font-medium truncate",
											children: [
												"Visit to",
												" ",
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-amber-500 font-semibold",
													children: clientName
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 599,
													columnNumber: 27
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 597,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-[10px] text-white/40 mt-1 flex flex-wrap gap-x-1.5 items-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: formatUserAgent(activity.user_agent) }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 602,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "•" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 603,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: new Date(activity.scanned_at).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit"
												}) }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 604,
													columnNumber: 27
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 601,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 596,
										columnNumber: 23
									}, this)]
								}, activity.id, true, {
									fileName: _jsxFileName,
									lineNumber: 592,
									columnNumber: 22
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 589,
							columnNumber: 121
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 585,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 565,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 377,
				columnNumber: 7
			}, this),
			qrOpen && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 bg-black/90 backdrop-blur-md grid place-items-center p-4 overflow-y-auto",
				onClick: () => setQrOpen(null),
				children: /* @__PURE__ */ (void 0)("div", {
					onClick: (e) => e.stopPropagation(),
					className: "w-full max-w-5xl my-8",
					children: /* @__PURE__ */ (void 0)(LuxuryQRCode, {
						url: buildClientUrl(qrOpen.slug),
						businessName: qrOpen.business_name,
						logoUrl: qrOpen.logo_url,
						category: qrOpen.category,
						onClose: () => setQrOpen(null)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 621,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 620,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 619,
				columnNumber: 18
			}, this),
			clientToDelete && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 bg-black/95 backdrop-blur-md grid place-items-center p-4 overflow-y-auto",
				onClick: () => setClientToDelete(null),
				children: /* @__PURE__ */ (void 0)("div", {
					onClick: (e) => e.stopPropagation(),
					className: "w-full max-w-md bg-[#0F0F12]/95 border border-red-500/20 rounded-[2rem] p-6 text-center space-y-6 shadow-2xl relative overflow-hidden",
					children: [
						/* @__PURE__ */ (void 0)("div", { className: "absolute -top-12 -left-12 size-36 bg-red-500/10 blur-3xl rounded-full" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 629,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", { className: "absolute -bottom-12 -right-12 size-36 bg-red-500/10 blur-3xl rounded-full" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 630,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "relative z-10 space-y-4",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "size-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto",
								children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-7 text-red-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 634,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 633,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (void 0)("h3", {
										className: "text-xl font-serif text-white",
										children: "Delete Client Profile?"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 637,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-slate-400 leading-relaxed",
										children: [
											"Are you absolutely sure you want to permanently delete",
											" ",
											/* @__PURE__ */ (void 0)("strong", {
												className: "text-white font-semibold",
												children: [
													"\"",
													clientToDelete.name,
													"\""
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 640,
												columnNumber: 19
											}, this),
											"?"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 638,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-[10.5px] text-red-400/80 bg-red-500/5 border border-red-500/10 rounded-xl p-3 leading-normal mt-3",
										children: "This will permanently delete all client details, QR codes, visitor statistics, and all uploaded images from storage. This action cannot be undone."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 642,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 636,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 632,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex flex-col sm:flex-row gap-3 pt-2 relative z-10",
							children: [/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setClientToDelete(null),
								className: "flex-1 px-5 py-3 border border-white/10 hover:border-white/20 text-white rounded-xl text-xs uppercase tracking-wider font-semibold bg-white/5 hover:bg-white/10 transition-all cursor-pointer",
								children: "No, Keep Profile"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 650,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => remove(clientToDelete.id, clientToDelete.name),
								disabled: deletingId !== null,
								className: "flex-1 px-5 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-40 text-white rounded-xl text-xs uppercase tracking-wider font-bold transition-all shadow-lg shadow-red-500/15 flex items-center justify-center gap-2 cursor-pointer",
								children: deletingId === clientToDelete.id ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("span", { className: "animate-spin inline-block size-3.5 border-2 border-white border-t-transparent rounded-full" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 655,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Deleting..." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 656,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 654,
									columnNumber: 53
								}, this) : /* @__PURE__ */ (void 0)("span", { children: "Yes, Delete Profile" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 657,
									columnNumber: 25
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 653,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 649,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 627,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 626,
				columnNumber: 26
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 295,
		columnNumber: 10
	}, this);
}
function StatCard({ icon, label, value, trend }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "bg-white/5 rounded-3xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex justify-between items-start mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-2.5 bg-white/5 rounded-xl border border-white/5",
				children: icon
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 677,
				columnNumber: 9
			}, this), trend && /* @__PURE__ */ (void 0)("span", {
				className: "text-[9px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-lg",
				children: trend
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 678,
				columnNumber: 19
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 676,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-2xl font-bold text-white tracking-tighter",
			children: value.toLocaleString()
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 683,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 684,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 682,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 675,
		columnNumber: 10
	}, this);
}
function IconBtn({ children, danger, as: As = "button", ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(As, {
		...rest,
		className: `p-2.5 transition-all rounded-lg disabled:opacity-30 disabled:pointer-events-none ${danger ? "text-white/40 hover:text-red-400 hover:bg-red-500/5" : "text-white/50 hover:text-gold hover:bg-gold/5"}`,
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 707,
		columnNumber: 10
	}, this);
}
//#endregion
export { Dashboard as component };
