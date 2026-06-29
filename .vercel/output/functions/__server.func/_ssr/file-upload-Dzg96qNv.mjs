import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DXjAb9eS.mjs";
import { i as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as X, o as Upload } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/file-upload-Dzg96qNv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/file-upload.tsx";
function FileUpload({ label, value, onChange, accept = "image/*", folder }) {
	const [uploading, setUploading] = (0, import_react.useState)(false);
	async function handle(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		try {
			const ext = file.name.split(".").pop() ?? "bin";
			const path = `${folder}/${crypto.randomUUID()}.${ext}`;
			const { error } = await supabase.storage.from("client-assets").upload(path, file, { upsert: false });
			if (error) throw error;
			const { data } = await supabase.storage.from("client-assets").createSignedUrl(path, 3600 * 24 * 365 * 10);
			if (!data) throw new Error("Failed to create URL");
			onChange(data.signedUrl);
			toast.success("Uploaded");
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Upload failed";
			toast.error(msg);
		} finally {
			setUploading(false);
			e.target.value = "";
		}
	}
	const isImage = accept.startsWith("image");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: "text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-2",
		children: label
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 47,
		columnNumber: 7
	}, this), value ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center gap-3 border border-white/10 p-3 bg-white/[0.02]",
		children: [
			isImage ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
				src: value,
				alt: "",
				className: "size-14 object-cover rounded"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 13
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "size-14 grid place-items-center bg-onyx text-gold text-[9px] uppercase",
				children: "PDF"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 55,
				columnNumber: 13
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
				href: value,
				target: "_blank",
				rel: "noreferrer",
				className: "flex-1 text-xs text-white/70 truncate hover:text-gold",
				children: "View"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 59,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => onChange(null),
				className: "text-white/40 hover:text-destructive",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 67,
				columnNumber: 11
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 51,
		columnNumber: 9
	}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: "flex items-center justify-center gap-2 border border-dashed border-white/15 px-4 py-6 cursor-pointer hover:border-gold hover:bg-gold/5 transition-colors",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "size-4 text-white/50" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 77,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-xs text-white/60",
				children: uploading ? "Uploading…" : "Choose file"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 78,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
				type: "file",
				accept,
				onChange: handle,
				disabled: uploading,
				className: "hidden"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 79,
				columnNumber: 11
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 76,
		columnNumber: 9
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 46,
		columnNumber: 5
	}, this);
}
function GalleryUpload({ value, onChange }) {
	const [uploading, setUploading] = (0, import_react.useState)(false);
	async function handle(e) {
		const files = Array.from(e.target.files ?? []);
		if (!files.length) return;
		setUploading(true);
		try {
			const urls = [];
			for (const file of files) {
				const ext = file.name.split(".").pop() ?? "jpg";
				const path = `gallery/${crypto.randomUUID()}.${ext}`;
				const { error } = await supabase.storage.from("client-assets").upload(path, file, { upsert: false });
				if (error) throw error;
				const { data } = await supabase.storage.from("client-assets").createSignedUrl(path, 3600 * 24 * 365 * 10);
				if (data) urls.push(data.signedUrl);
			}
			onChange([...value, ...urls]);
			toast.success(`${urls.length} photo(s) added`);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Upload failed";
			toast.error(msg);
		} finally {
			setUploading(false);
			e.target.value = "";
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: "text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-2",
		children: "Photo Gallery"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 131,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid grid-cols-3 gap-2",
		children: [value.map((url, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative aspect-square group",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
				src: url,
				alt: "",
				className: "size-full object-cover rounded"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 137,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => onChange(value.filter((_, idx) => idx !== i)),
				className: "absolute top-1 right-1 bg-obsidian/80 text-white/80 hover:text-destructive p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 143,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 138,
				columnNumber: 13
			}, this)]
		}, url + i, true, {
			fileName: _jsxFileName,
			lineNumber: 136,
			columnNumber: 11
		}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
			className: "aspect-square border border-dashed border-white/15 grid place-items-center cursor-pointer hover:border-gold hover:bg-gold/5 transition-colors",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "size-4 text-white/50" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 148,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
				type: "file",
				accept: "image/*",
				multiple: true,
				onChange: handle,
				disabled: uploading,
				className: "hidden"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 149,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 147,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 134,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 130,
		columnNumber: 5
	}, this);
}
//#endregion
export { GalleryUpload as n, FileUpload as t };
