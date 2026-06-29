import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DXjAb9eS.mjs";
import { i as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { F as useNavigate, g as Link } from "../_libs--tanstack-react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { A as Image, F as ExternalLink, N as FileText, q as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as Route } from "./clients.-id-BxmjqwIL.mjs";
import { t as ClientForm } from "./client-form-CJj2pX4j.mjs";
import { i as generateQrDataUrl, n as downloadDataUrl, r as downloadQrPdf, t as buildClientUrl } from "./qr-kv4ZqdPQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients.-id-DcckjHkH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/clients.$id.tsx?tsr-split=component";
function EditClient() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const [client, setClient] = (0, import_react.useState)(null);
	const [qr, setQr] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
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
	async function save(draft) {
		if (!client) return;
		const { id, created_at, updated_at, owner_id, slug, ...updateData } = draft;
		const { data, error } = await supabase.from("clients").update(updateData).eq("id", client.id).select().maybeSingle();
		if (error) {
			toast.error(error.message || "Failed to save changes");
			return;
		}
		if (data) {
			setClient(data);
			setQr(await generateQrDataUrl(buildClientUrl(data.slug)));
		}
		toast.success("Changes saved successfully");
	}
	if (loading || !client) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "text-white/50 text-center py-20 uppercase tracking-[0.2em] text-xs",
		children: "Loading…"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 62,
		columnNumber: 34
	}, this);
	const publicUrl = buildClientUrl(client.slug);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "max-w-5xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/dashboard",
			className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-gold mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-3" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 68,
				columnNumber: 9
			}, this), " Back"]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 67,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid lg:grid-cols-[1fr_320px] gap-10",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[10px] uppercase tracking-[0.3em] text-gold/70",
					children: "Edit Client"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 73,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-serif text-4xl text-white mt-1 mb-10",
					children: client.business_name
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 74,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClientForm, {
					initial: client,
					onSubmit: save,
					submitLabel: "Save Changes"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 75,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 72,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: "lg:sticky lg:top-24 lg:self-start space-y-6 border border-gold/20 bg-gold/[0.03] p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[10px] uppercase tracking-[0.3em] text-gold/70 mb-1",
						children: "QR Code"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 80,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-serif text-xl text-white",
						children: client.business_name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 11
					}, this),
					qr && /* @__PURE__ */ (void 0)("div", {
						className: "p-3 bg-white rounded",
						children: /* @__PURE__ */ (void 0)("img", {
							src: qr,
							alt: "QR code",
							className: "w-full"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 84,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 83,
						columnNumber: 18
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: publicUrl,
						target: "_blank",
						rel: "noreferrer",
						className: "break-all block text-[10px] font-mono text-white/50 hover:text-gold",
						children: publicUrl
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => qr && downloadDataUrl(qr, `${client.slug}-qr.png`),
								className: "w-full bg-gold text-obsidian py-3 text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-gold-soft transition-colors flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 91,
									columnNumber: 15
								}, this), " Download PNG"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 90,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => downloadQrPdf(publicUrl, client.business_name),
								className: "w-full border border-gold/40 text-gold py-3 text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-gold/10 transition-colors flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 94,
									columnNumber: 15
								}, this), " Download PDF"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 93,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/c/$slug",
								params: { slug: client.slug },
								className: "w-full border border-white/10 text-white/70 py-3 text-[11px] uppercase tracking-[0.2em] hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 99,
									columnNumber: 15
								}, this), " View Page"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 96,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 89,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 78,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 71,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 66,
		columnNumber: 10
	}, this);
}
//#endregion
export { EditClient as component };
