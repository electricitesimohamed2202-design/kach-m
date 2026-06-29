import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as LUXURY_THEMES } from "./themes-BuFZdXWu.mjs";
import { n as GalleryUpload, t as FileUpload } from "./file-upload-Dzg96qNv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-form-CJj2pX4j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/client-form.tsx";
var FIELDS = [
	{
		key: "phone",
		label: "Phone",
		placeholder: "+1 555 000 0000"
	},
	{
		key: "whatsapp",
		label: "WhatsApp",
		placeholder: "+1 555 000 0000"
	},
	{
		key: "email",
		label: "Email",
		placeholder: "hello@business.com",
		type: "email"
	},
	{
		key: "website",
		label: "Website",
		placeholder: "https://…"
	},
	{
		key: "instagram",
		label: "Instagram",
		placeholder: "https://instagram.com/…"
	},
	{
		key: "facebook",
		label: "Facebook",
		placeholder: "https://facebook.com/…"
	},
	{
		key: "tiktok",
		label: "TikTok",
		placeholder: "https://tiktok.com/@…"
	},
	{
		key: "youtube",
		label: "YouTube",
		placeholder: "https://youtube.com/…"
	},
	{
		key: "telegram",
		label: "Telegram",
		placeholder: "https://t.me/…"
	},
	{
		key: "maps_url",
		label: "Google Maps URL",
		placeholder: "https://maps.google.com/…"
	},
	{
		key: "address",
		label: "Address",
		placeholder: "123 Luxury Ave, City"
	}
];
function ClientForm({ initial, onSubmit, submitLabel }) {
	const [d, setD] = (0, import_react.useState)(initial ?? {});
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (initial) setD(initial);
	}, [initial]);
	function update(k, v) {
		setD((prev) => ({
			...prev,
			[k]: v
		}));
	}
	async function handle(e) {
		e.preventDefault();
		if (!d.business_name) return;
		setSaving(true);
		try {
			await onSubmit(d);
		} finally {
			setSaving(false);
		}
	}
	const gallery = d.gallery ?? [];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
		onSubmit: handle,
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-serif text-2xl text-gold",
						children: "Identity"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 63,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Business Name *",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								required: true,
								value: d.business_name ?? "",
								onChange: (e) => update("business_name", e.target.value),
								className: inputCls
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 66,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 65,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Business Category",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
								value: d.category ?? "",
								onChange: (e) => update("category", e.target.value || null),
								className: inputCls,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "",
									className: "bg-obsidian",
									children: "Select category"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 79,
									columnNumber: 15
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
								].map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: c,
									className: "bg-obsidian",
									children: c
								}, c, false, {
									fileName: _jsxFileName,
									lineNumber: 98,
									columnNumber: 17
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 74,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 73,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 64,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
						label: "Tagline",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							value: d.tagline ?? "",
							onChange: (e) => update("tagline", e.target.value),
							placeholder: "Short tagline",
							className: inputCls
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 106,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
						label: "Description",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
							value: d.description ?? "",
							onChange: (e) => update("description", e.target.value),
							rows: 3,
							className: inputCls + " resize-none"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid sm:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileUpload, {
							label: "Logo / Profile Photo",
							value: d.logo_url,
							onChange: (url) => update("logo_url", url),
							folder: "logos"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 122,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileUpload, {
							label: "Cover Image",
							value: d.cover_url,
							onChange: (url) => update("cover_url", url),
							folder: "covers"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 128,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 121,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 62,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-serif text-2xl text-gold",
					children: "Theme"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 138,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-2 sm:grid-cols-5 gap-3",
					children: LUXURY_THEMES.map((t) => {
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => update("theme", t.id),
							className: `p-2.5 border text-left transition-all duration-300 rounded-lg ${(d.theme ?? "obsidian") === t.id ? "border-gold bg-gold/10" : "border-white/10 hover:border-white/30"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `h-10 w-full bg-gradient-to-br ${t.swatch} rounded mb-1.5` }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] uppercase tracking-[0.12em] text-white/80 truncate font-medium",
								title: t.name,
								children: t.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 150,
								columnNumber: 17
							}, this)]
						}, t.id, true, {
							fileName: _jsxFileName,
							lineNumber: 143,
							columnNumber: 15
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 139,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 137,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-serif text-2xl text-gold",
					children: "Contact & Social"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 163,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid sm:grid-cols-2 gap-4",
					children: FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
						label: f.label,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: f.type ?? "text",
							placeholder: f.placeholder,
							value: d[f.key] ?? "",
							onChange: (e) => update(f.key, e.target.value || null),
							className: inputCls
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 167,
							columnNumber: 15
						}, this)
					}, f.key, false, {
						fileName: _jsxFileName,
						lineNumber: 166,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 164,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 162,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-serif text-2xl text-gold",
						children: "Hours & Documents"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 180,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
						label: "Business Hours",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
							value: d.business_hours ?? "",
							onChange: (e) => update("business_hours", e.target.value),
							rows: 3,
							placeholder: "Mon-Fri 9:00 – 18:00\nSat 10:00 – 16:00\nSun closed",
							className: inputCls + " resize-none font-mono text-xs"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 182,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 181,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileUpload, {
						label: "PDF Document (brochure, menu, etc.)",
						value: d.pdf_url,
						onChange: (url) => update("pdf_url", url),
						accept: "application/pdf",
						folder: "pdfs"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 190,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 179,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "font-serif text-2xl text-gold mb-4",
				children: "Gallery"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 200,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GalleryUpload, {
				value: gallery,
				onChange: (urls) => update("gallery", urls)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 201,
				columnNumber: 9
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 199,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "submit",
				disabled: saving || !d.business_name,
				className: "bg-gold text-obsidian px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-gold-soft disabled:opacity-40 transition-colors gold-glow",
				children: saving ? "Saving…" : submitLabel
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 204,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 61,
		columnNumber: 5
	}, this);
}
var inputCls = "w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors";
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: "text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-2",
		children: label
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 221,
		columnNumber: 7
	}, this), children] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 220,
		columnNumber: 5
	}, this);
}
//#endregion
export { ClientForm as t };
