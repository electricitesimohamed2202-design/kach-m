import { t as supabase } from "./client-DXjAb9eS.mjs";
import { F as useNavigate, g as Link } from "../_libs--tanstack-react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { q as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as ClientForm } from "./client-form-CJj2pX4j.mjs";
import { a as slugify } from "./qr-kv4ZqdPQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients.new-M7o4etzc.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/clients.new.tsx?tsr-split=component";
function NewClient() {
	const navigate = useNavigate();
	async function create(draft) {
		const baseSlug = slugify(draft.business_name);
		let slug = baseSlug;
		let attempt = 0;
		while (true) {
			const { data } = await supabase.from("clients").select("id").eq("slug", slug).maybeSingle();
			if (!data) break;
			attempt++;
			slug = `${baseSlug}-${attempt + 1}`;
		}
		const { data, error } = await supabase.from("clients").insert({
			...draft,
			slug
		}).select().single();
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Client created");
		navigate({
			to: "/clients/$id",
			params: { id: data.id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "max-w-3xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/dashboard",
				className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-gold mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-3" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 9
				}, this), " Back"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 42,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[10px] uppercase tracking-[0.3em] text-gold/70",
				children: "Add Client"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 45,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "font-serif text-4xl text-white mt-1 mb-10",
				children: "New Profile"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 46,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClientForm, {
				onSubmit: create,
				submitLabel: "Create Client"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 47,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 41,
		columnNumber: 10
	}, this);
}
//#endregion
export { NewClient as component };
