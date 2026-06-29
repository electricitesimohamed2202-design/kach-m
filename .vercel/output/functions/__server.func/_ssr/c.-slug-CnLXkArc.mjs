import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DXjAb9eS.mjs";
import { i as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs--tanstack-react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Route } from "./c.-slug-DkvxS1QL.mjs";
import { n as getThemeById } from "./themes-BuFZdXWu.mjs";
import { I as Download, K as ArrowRight, N as FileText, P as Facebook, R as Clock, S as MessageCircle, a as UserPlus, d as Share2, j as Globe, k as Instagram, n as X, p as Send, r as Users, t as Youtube, w as MapPin, x as Music2, y as Phone } from "../_libs/lucide-react.mjs";
import { n as AnimatePresence } from "../_libs-framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/c.-slug-CnLXkArc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/c.$slug.tsx?tsr-split=component";
function ClientPage() {
	const { slug } = Route.useParams();
	const [c, setC] = (0, import_react.useState)(null);
	const [visitorCount, setVisitorCount] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [missing, setMissing] = (0, import_react.useState)(false);
	const [lightbox, setLightbox] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data } = await supabase.from("clients").select("*").eq("slug", slug).maybeSingle();
			if (!data) setMissing(true);
			else {
				setC(data);
				const { count } = await supabase.from("qr_scans").select("*", {
					count: "exact",
					head: true
				}).eq("client_id", data.id);
				setVisitorCount(count ?? 0);
				const storageKey = `visited_client_${data.id}`;
				if (!localStorage.getItem(storageKey)) {
					localStorage.setItem(storageKey, "true");
					const { error } = await supabase.from("qr_scans").insert({
						client_id: data.id,
						user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
						referrer: typeof document !== "undefined" ? document.referrer.slice(0, 500) || null : null
					});
					if (!error) setVisitorCount((prev) => prev !== null ? prev + 1 : 1);
				}
			}
			setLoading(false);
		})();
	}, [slug]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-[#070708] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute w-72 h-72 rounded-full bg-[#D4AF37]/5 blur-3xl -top-10 -left-10 animate-pulse" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 58,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute w-72 h-72 rounded-full bg-[#D4AF37]/5 blur-3xl -bottom-10 -right-10 animate-pulse" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 59,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative z-10 flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
						initial: {
							scale: .8,
							opacity: 0
						},
						animate: {
							scale: 1,
							opacity: 1
						},
						transition: {
							duration: 1.5,
							ease: "easeOut"
						},
						className: "size-24 rounded-full border border-[#D4AF37]/30 p-1 flex items-center justify-center bg-black/40 backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.1)] mb-8",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "size-full rounded-full border border-[#D4AF37]/10 flex items-center justify-center bg-gradient-to-b from-[#1C1C24] to-[#0D0D12]",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-serif italic text-3xl text-gradient bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent",
								children: "K"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 74,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 73,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 63,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative size-10 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 rounded-full border border-[#D4AF37]/15" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
							animate: { rotate: 360 },
							transition: {
								repeat: Infinity,
								duration: 1.2,
								ease: "linear"
							},
							className: "absolute inset-0 rounded-full border border-t-[#D4AF37] border-r-[#D4AF37]/20 border-b-transparent border-l-transparent"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 83,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.p, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: .3,
							duration: .8
						},
						className: "text-[10px] uppercase tracking-[0.4em] text-white/50 font-medium",
						children: "Kach QR Code"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 92,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.p, {
						initial: { opacity: 0 },
						animate: { opacity: .3 },
						transition: {
							delay: .6,
							duration: .8
						},
						className: "text-[9px] uppercase tracking-[0.2em] text-white/80 mt-1 font-semibold",
						children: "Crafting Luxury"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 104,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 61,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 56,
		columnNumber: 12
	}, this);
	if (missing || !c) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NotFoundProfile, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 117,
		columnNumber: 29
	}, this);
	const publicUrl = typeof window !== "undefined" ? window.location.origin + `/c/${c.slug}` : "";
	async function share() {
		if (typeof navigator !== "undefined" && navigator.share) try {
			await navigator.share({
				title: c.business_name,
				url: publicUrl
			});
		} catch (err) {
			console.warn("Share failed:", err);
		}
		else {
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
			"END:VCARD"
		].filter(Boolean).join("\n");
		const blob = new Blob([vcard], { type: "text/vcard" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${c.business_name}.vcf`;
		a.click();
		URL.revokeObjectURL(url);
		toast.success("Contact file downloaded.");
	}
	const activeSocials = [
		{
			key: "instagram",
			label: "Instagram",
			Icon: Instagram
		},
		{
			key: "facebook",
			label: "Facebook",
			Icon: Facebook
		},
		{
			key: "tiktok",
			label: "TikTok",
			Icon: Music2
		},
		{
			key: "youtube",
			label: "YouTube",
			Icon: Youtube
		},
		{
			key: "telegram",
			label: "Telegram",
			Icon: Send
		},
		{
			key: "website",
			label: "Website",
			Icon: Globe
		}
	].filter((s) => c[s.key]);
	const gallery = Array.isArray(c.gallery) ? c.gallery : [];
	const theme = getThemeById(c.theme);
	theme.isLight;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `min-h-screen ${theme.bgClass} ${theme.textClass} flex flex-col justify-start items-center relative transition-colors duration-500 overflow-x-hidden`,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `fixed top-[-10%] right-[-10%] w-[80%] md:w-[50%] h-[40%] ${theme.glowColor1} blur-[120px] pointer-events-none transition-all duration-700 z-0` }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 187,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `fixed bottom-[-10%] left-[-10%] w-[70%] md:w-[45%] h-[40%] ${theme.glowColor2} blur-[100px] pointer-events-none transition-all duration-700 z-0` }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 188,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "w-full max-w-lg relative z-10 flex-1 flex flex-col justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative h-44 xs:h-52 sm:h-60 md:h-68 w-full overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
								initial: {
									scale: 1.1,
									opacity: 0
								},
								animate: {
									scale: 1,
									opacity: 1
								},
								transition: {
									duration: 1.2,
									ease: "easeOut"
								},
								className: "absolute inset-0 size-full",
								children: [
									c.cover_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: c.cover_url,
										alt: "",
										className: "absolute inset-0 size-full object-cover select-none"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 205,
										columnNumber: 30
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `absolute inset-0 bg-gradient-to-br ${theme.swatch} opacity-90` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 205,
										columnNumber: 129
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `absolute inset-0 bg-gradient-to-b ${theme.gradientOverlay} via-transparent` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 207,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `absolute inset-0 bg-gradient-to-t ${theme.gradientOverlay} via-transparent to-transparent` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 208,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 195,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute top-4 left-4 z-20",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/",
									className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest text-white/80 hover:text-white hover:bg-black/50 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Kach" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 214,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 213,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 212,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 194,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "px-5 sm:px-6 -mt-16 xs:-mt-20 sm:-mt-24 relative z-10 text-center flex flex-col items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
									initial: {
										y: 20,
										opacity: 0
									},
									animate: {
										y: 0,
										opacity: 1
									},
									transition: {
										duration: .8,
										delay: .1,
										type: "spring",
										stiffness: 100
									},
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `absolute inset-0 rounded-full ${theme.glowColor1} blur-2xl scale-125 opacity-70` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 234,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: `relative size-32 xs:size-36 sm:size-40 rounded-full border ${theme.accentBorder} p-[4px] ${theme.bgClass} ${theme.accentGlow} transition-all duration-500`,
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: `size-full rounded-full border ${theme.cardBorder} overflow-hidden bg-gradient-to-b from-neutral-800 to-black relative shadow-inner`,
											children: c.logo_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
												src: c.logo_url,
												alt: c.business_name,
												className: "size-full object-cover transition-transform duration-500 hover:scale-105"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 237,
												columnNumber: 33
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: `size-full grid place-items-center font-serif text-5xl sm:text-6xl ${theme.accentText} select-none`,
												children: c.business_name.charAt(0)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 237,
												columnNumber: 167
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 236,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 235,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
									initial: { opacity: 0 },
									animate: { opacity: 1 },
									transition: { delay: .3 },
									className: "mt-6 flex items-center gap-3 justify-center select-none",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `h-px w-6 ${theme.isLight ? "bg-stone-300" : "bg-white/10"}` }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 252,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: `text-[8px] uppercase tracking-[0.45em] font-semibold ${theme.mutedText}`,
											children: "Exclusive Digital Profile"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 253,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `h-px w-6 ${theme.isLight ? "bg-stone-300" : "bg-white/10"}` }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 256,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.h1, {
									initial: {
										opacity: 0,
										y: 10
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										delay: .4,
										duration: .6
									},
									className: `mt-3 font-serif text-4xl sm:text-5xl ${theme.accentText} tracking-tight leading-tight font-normal`,
									children: c.business_name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 260,
									columnNumber: 13
								}, this),
								c.tagline && /* @__PURE__ */ (void 0)(motion.p, {
									initial: { opacity: 0 },
									animate: { opacity: .8 },
									transition: {
										delay: .5,
										duration: .6
									},
									className: `mt-2 ${theme.secondaryText} text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-medium max-w-sm`,
									children: c.tagline
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 273,
									columnNumber: 27
								}, this),
								c.description && /* @__PURE__ */ (void 0)(motion.div, {
									initial: { opacity: 0 },
									animate: { opacity: 1 },
									transition: {
										delay: .6,
										duration: .8
									},
									className: "max-w-md w-full",
									children: /* @__PURE__ */ (void 0)("div", {
										className: `mt-5 px-6 py-4 rounded-xl border ${theme.cardBorder} bg-white/[0.015] backdrop-blur-sm relative overflow-hidden`,
										children: [/* @__PURE__ */ (void 0)("div", { className: `absolute top-0 left-0 w-1 h-full ${theme.accentBg} opacity-20` }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 293,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: `text-xs sm:text-sm leading-relaxed ${theme.secondaryText} font-serif italic text-center text-stone-400`,
											children: [
												"\"",
												c.description,
												"\""
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 294,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 292,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 284,
									columnNumber: 31
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 220,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "px-5 sm:px-6 mt-8 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: `grid ${c.phone && c.whatsapp ? "grid-cols-2" : "grid-cols-1"} gap-3`,
								children: [c.phone && /* @__PURE__ */ (void 0)(motion.a, {
									initial: {
										opacity: 0,
										x: -10
									},
									animate: {
										opacity: 1,
										x: 0
									},
									transition: { delay: .7 },
									whileHover: {
										y: -2,
										scale: 1.01
									},
									whileTap: { scale: .99 },
									href: `tel:${c.phone}`,
									className: `group relative overflow-hidden flex items-center justify-center gap-2.5 py-4 ${theme.accentBg} ${theme.isLight ? "text-white" : "text-obsidian"} font-bold text-xs uppercase tracking-[0.2em] ${theme.accentGlow} ${theme.accentHoverBg} transition-all duration-300 rounded-xl shadow-lg`,
									children: [/* @__PURE__ */ (void 0)(Phone, {
										className: "size-4 shrink-0 transition-transform group-hover:scale-110",
										strokeWidth: 2.5
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 318,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: "Call Now" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 319,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 304,
									columnNumber: 27
								}, this), c.whatsapp && /* @__PURE__ */ (void 0)(motion.a, {
									initial: {
										opacity: 0,
										x: 10
									},
									animate: {
										opacity: 1,
										x: 0
									},
									transition: { delay: .7 },
									whileHover: {
										y: -2,
										scale: 1.01
									},
									whileTap: { scale: .99 },
									href: `https://wa.me/${c.whatsapp.replace(/[^0-9]/g, "")}`,
									target: "_blank",
									rel: "noreferrer",
									className: `flex items-center justify-center gap-2.5 py-4 border ${theme.accentBorder} bg-white/[0.01] ${theme.accentText} font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/[0.04] transition-all duration-300 rounded-xl`,
									children: [/* @__PURE__ */ (void 0)(MessageCircle, {
										className: "size-4 shrink-0",
										strokeWidth: 2.5
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 335,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: "WhatsApp" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 336,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 321,
									columnNumber: 30
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 303,
								columnNumber: 13
							}, this), c.maps_url && /* @__PURE__ */ (void 0)(motion.a, {
								initial: {
									opacity: 0,
									y: 10
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: { delay: .8 },
								whileHover: {
									y: -2,
									scale: 1.01
								},
								whileTap: { scale: .99 },
								href: c.maps_url,
								target: "_blank",
								rel: "noreferrer",
								className: `flex items-center justify-center gap-2.5 w-full py-4 border ${theme.cardBorder} bg-white/[0.015] ${theme.primaryText} font-semibold text-xs uppercase tracking-[0.2em] hover:border-amber-500/30 hover:bg-amber-500/[0.02] transition-all duration-300 rounded-xl`,
								children: [/* @__PURE__ */ (void 0)(MapPin, {
									className: `size-4 ${theme.accentText}`,
									strokeWidth: 2.5
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 354,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: "View on Google Maps" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 355,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 340,
								columnNumber: 28
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 302,
							columnNumber: 11
						}, this),
						activeSocials.length > 0 && /* @__PURE__ */ (void 0)(motion.section, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: { delay: .9 },
							className: "px-5 sm:px-6 mt-12",
							children: [/* @__PURE__ */ (void 0)(SectionHeader, {
								label: "Connect With Us",
								theme
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 367,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap justify-center gap-3",
								children: activeSocials.map(({ key, label, Icon }, idx) => /* @__PURE__ */ (void 0)(motion.a, {
									href: c[key],
									target: "_blank",
									rel: "noreferrer",
									"aria-label": label,
									whileHover: {
										scale: 1.12,
										y: -2
									},
									whileTap: { scale: .95 },
									transition: {
										type: "spring",
										stiffness: 300,
										damping: 15
									},
									className: `group relative size-12 grid place-items-center border ${theme.cardBorder} bg-white/[0.01] hover:border-amber-500/40 hover:bg-amber-500/[0.04] transition-all duration-300 rounded-full`,
									children: [/* @__PURE__ */ (void 0)(Icon, {
										className: `size-4 ${theme.accentText} group-hover:scale-105 transition-transform`,
										strokeWidth: 2
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 383,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("div", { className: "absolute inset-0 rounded-full bg-amber-500/5 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 384,
										columnNumber: 21
									}, this)]
								}, label, true, {
									fileName: _jsxFileName,
									lineNumber: 373,
									columnNumber: 24
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 368,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 360,
							columnNumber: 40
						}, this),
						c.business_hours && /* @__PURE__ */ (void 0)(motion.section, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: { delay: 1 },
							className: "px-5 sm:px-6 mt-12",
							children: [/* @__PURE__ */ (void 0)(SectionHeader, {
								label: "Business Hours",
								Icon: Clock,
								theme
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 397,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: `border ${theme.cardBorder} bg-white/[0.015] backdrop-blur-sm p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/25 transition-colors duration-500`,
								children: [/* @__PURE__ */ (void 0)("div", { className: `absolute top-0 right-0 w-24 h-24 ${theme.glowColor1} blur-2xl opacity-20 pointer-events-none` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 399,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("pre", {
									className: `whitespace-pre-wrap font-sans text-xs sm:text-sm ${theme.secondaryText} leading-relaxed font-normal`,
									children: c.business_hours
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 400,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 398,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 390,
							columnNumber: 32
						}, this),
						c.address && /* @__PURE__ */ (void 0)(motion.section, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: { delay: 1.05 },
							className: "px-5 sm:px-6 mt-10",
							children: [/* @__PURE__ */ (void 0)(SectionHeader, {
								label: "Location Details",
								Icon: MapPin,
								theme
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 414,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: `border ${theme.cardBorder} bg-white/[0.015] backdrop-blur-sm p-5 rounded-2xl flex items-start gap-3 group hover:border-amber-500/25 transition-colors duration-500`,
								children: [/* @__PURE__ */ (void 0)(MapPin, {
									className: `size-5 ${theme.accentText} shrink-0 mt-0.5`,
									strokeWidth: 2
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 416,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: `text-xs sm:text-sm ${theme.secondaryText} leading-relaxed`,
									children: c.address
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 417,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 415,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 407,
							columnNumber: 25
						}, this),
						gallery.length > 0 && /* @__PURE__ */ (void 0)(motion.section, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: { delay: 1.1 },
							className: "px-5 sm:px-6 mt-12",
							children: [/* @__PURE__ */ (void 0)(SectionHeader, {
								label: "Visual Gallery",
								theme
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 431,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-2 sm:grid-cols-6 gap-2.5",
								children: gallery.map((src, i) => {
									let colSpan = "col-span-1 sm:col-span-3 aspect-square sm:aspect-[16/10]";
									if (gallery.length % 3 === 1 && i === 0) colSpan = "col-span-2 sm:col-span-6 aspect-[16/10] sm:aspect-[16/10]";
									else if (i % 3 === 0) colSpan = "col-span-2 sm:col-span-4 aspect-[4/3] sm:aspect-[4/3]";
									else if (i % 3 === 1) colSpan = "col-span-1 sm:col-span-2 aspect-square sm:aspect-square";
									else if (i % 3 === 2) colSpan = "col-span-2 sm:col-span-6 aspect-[16/10] sm:aspect-[16/8]";
									return /* @__PURE__ */ (void 0)(motion.button, {
										onClick: () => setLightbox(src),
										whileHover: {
											scale: 1.015,
											y: -2
										},
										whileTap: { scale: .99 },
										transition: {
											type: "spring",
											stiffness: 200
										},
										className: `${colSpan} relative overflow-hidden border ${theme.cardBorder} hover:border-amber-500/40 rounded-2xl bg-black/40 shadow-lg cursor-pointer group`,
										children: [/* @__PURE__ */ (void 0)("img", {
											src,
											alt: "",
											loading: "lazy",
											className: "size-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 454,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3",
											children: /* @__PURE__ */ (void 0)("span", {
												className: "text-[9px] uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1",
												children: ["Expand ", /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 457,
													columnNumber: 34
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 456,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 455,
											columnNumber: 23
										}, this)]
									}, i, true, {
										fileName: _jsxFileName,
										lineNumber: 445,
										columnNumber: 22
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 432,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 424,
							columnNumber: 34
						}, this),
						c.pdf_url && /* @__PURE__ */ (void 0)(motion.div, {
							initial: {
								opacity: 0,
								y: 15
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: 1.15 },
							className: "px-5 sm:px-6 mt-12",
							children: /* @__PURE__ */ (void 0)("a", {
								href: c.pdf_url,
								target: "_blank",
								rel: "noreferrer",
								className: `group flex items-center justify-between py-5 px-6 border ${theme.accentBorder} bg-gradient-to-r from-amber-500/[0.03] to-amber-500/[0.08] hover:to-amber-500/[0.15] ${theme.accentGlow} transition-all duration-300 rounded-2xl`,
								children: [/* @__PURE__ */ (void 0)("span", {
									className: `text-xs sm:text-sm font-semibold flex items-center gap-3.5 ${theme.primaryText}`,
									children: [/* @__PURE__ */ (void 0)(FileText, {
										className: `size-5 ${theme.accentText}`,
										strokeWidth: 2
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 477,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "uppercase tracking-[0.15em] text-[10px] sm:text-xs text-stone-200",
										children: "View Menu & Brochure"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 478,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 476,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: `p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-amber-500/50 group-hover:bg-amber-500/10 transition-all`,
									children: /* @__PURE__ */ (void 0)(Download, {
										className: `size-3.5 ${theme.accentText} transition-transform group-hover:translate-y-0.5`,
										strokeWidth: 2.5
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 483,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 482,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 475,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 466,
							columnNumber: 25
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
							initial: {
								opacity: 0,
								y: 15
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: 1.2 },
							className: "px-5 sm:px-6 mt-12 grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: saveContact,
								className: `flex flex-col items-center justify-center gap-2 py-4 border ${theme.cardBorder} bg-white/[0.015] hover:border-amber-500/40 hover:bg-amber-500/[0.03] transition-all duration-300 group rounded-xl px-4 text-center cursor-pointer shadow-lg`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserPlus, {
									className: `size-5 ${theme.accentText} transition-transform group-hover:scale-105`,
									strokeWidth: 1.5
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 499,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: `text-[9px] uppercase tracking-[0.25em] ${theme.secondaryText} group-hover:text-amber-400 truncate w-full font-bold`,
									children: "Save Contact"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 500,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 498,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: share,
								className: `flex flex-col items-center justify-center gap-2 py-4 ${theme.accentBg} ${theme.isLight ? "text-white" : "text-obsidian"} font-bold ${theme.accentGlow} hover:${theme.accentHoverBg} transition-all duration-300 rounded-xl px-4 text-center cursor-pointer shadow-lg`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Share2, {
									className: "size-5 transition-transform hover:scale-105",
									strokeWidth: 2
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 505,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[9px] uppercase tracking-[0.25em] truncate w-full font-bold",
									children: "Share Profile"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 506,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 504,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 489,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 192,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
					className: "px-5 sm:px-6 mt-20 pb-12 text-center select-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-center gap-3 mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `h-px w-8 ${theme.isLight ? "bg-stone-300" : "bg-white/10"}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 516,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: `${theme.accentText} font-serif italic text-sm tracking-widest`,
									children: "Kach"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 517,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `h-px w-8 ${theme.isLight ? "bg-stone-300" : "bg-white/10"}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 520,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 515,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							className: `text-[8px] ${theme.mutedText} uppercase tracking-[0.4em] hover:${theme.accentText} transition-colors font-medium`,
							children: "Powered by Kach QR Code"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 523,
							columnNumber: 11
						}, this),
						visitorCount !== null && /* @__PURE__ */ (void 0)("div", {
							className: "mt-5 block",
							children: /* @__PURE__ */ (void 0)("div", {
								className: `inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[9px] font-mono tracking-widest uppercase bg-white/[0.01] border ${theme.cardBorder} ${theme.secondaryText}`,
								children: [/* @__PURE__ */ (void 0)(Users, { className: `size-3 ${theme.accentText}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 529,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: [visitorCount, " views"] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 530,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 528,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 527,
							columnNumber: 37
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 514,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 191,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, { children: lightbox && /* @__PURE__ */ (void 0)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				onClick: () => setLightbox(null),
				className: "fixed inset-0 z-50 bg-black/95 backdrop-blur-md grid place-items-center p-4",
				children: [/* @__PURE__ */ (void 0)(motion.button, {
					initial: {
						scale: .8,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					className: "absolute top-5 right-5 size-11 grid place-items-center border border-white/20 text-white hover:border-white hover:bg-white/10 transition-colors rounded-full cursor-pointer",
					onClick: () => setLightbox(null),
					children: /* @__PURE__ */ (void 0)(X, { className: "size-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 553,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 546,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)(motion.img, {
					initial: {
						scale: .9,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					exit: {
						scale: .9,
						opacity: 0
					},
					transition: {
						type: "spring",
						damping: 25,
						stiffness: 150
					},
					src: lightbox,
					alt: "",
					className: "max-h-[85vh] max-w-full object-contain border border-white/10 shadow-2xl rounded-lg"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 556,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 538,
				columnNumber: 22
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 537,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 185,
		columnNumber: 10
	}, this);
}
function SectionHeader({ label, Icon, theme }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center gap-4.5 mb-6 select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `h-px flex-1 bg-gradient-to-r from-transparent ${theme.isLight ? "to-stone-300/60" : "to-white/10"}` }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 586,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
				className: `text-[9px] uppercase tracking-[0.4em] ${theme.accentText} flex items-center gap-2 font-bold whitespace-nowrap`,
				children: [
					Icon && /* @__PURE__ */ (void 0)(Icon, { className: "size-3 text-amber-500" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 588,
						columnNumber: 18
					}, this),
					" ",
					label
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 587,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `h-px flex-1 bg-gradient-to-l from-transparent ${theme.isLight ? "to-stone-300/60" : "to-white/10"}` }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 590,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 585,
		columnNumber: 10
	}, this);
}
function NotFoundProfile() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-[#070708] flex items-center justify-center px-6 text-center select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute w-72 h-72 rounded-full bg-[#D4AF37]/5 blur-3xl -top-10 -left-10" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 596,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute w-72 h-72 rounded-full bg-[#D4AF37]/5 blur-3xl -bottom-10 -right-10" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 597,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-semibold mb-2",
						children: "Error 404"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 600,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-serif text-4xl text-white",
						children: "Profile Not Found"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 603,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-slate-400 mt-2.5 max-w-xs",
						children: "The luxury digital business card you are looking for does not exist or has been modified."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 604,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "mt-8 inline-block px-5 py-3 border border-[#D4AF37]/30 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors rounded-lg",
						children: "Return Home"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 607,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 599,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 594,
		columnNumber: 10
	}, this);
}
//#endregion
export { ClientPage as component };
