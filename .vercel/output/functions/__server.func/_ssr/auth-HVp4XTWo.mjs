import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DXjAb9eS.mjs";
import { i as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { F as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-HVp4XTWo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/auth.tsx?tsr-split=component";
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(async ({ data }) => {
			if (data.user) try {
				const { data: roleRow, error } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin").maybeSingle();
				if (error) {
					console.error("Error checking user role:", error);
					return;
				}
				if (roleRow) navigate({ to: "/dashboard" });
				else {
					await supabase.auth.signOut();
					toast.error("Access denied. You do not have administrator privileges.");
				}
			} catch (err) {
				console.error("Error in auth check:", err);
			}
		});
	}, [navigate]);
	async function submit(e) {
		e.preventDefault();
		setLoading(true);
		try {
			if (mode === "signin") {
				const { data, error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				if (!data.user) throw new Error("No user found");
				const { data: roleRow, error: roleError } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin").maybeSingle();
				if (roleError) throw roleError;
				if (!roleRow) {
					await supabase.auth.signOut();
					throw new Error("Access denied. You do not have administrator privileges.");
				}
				toast.success("Welcome back.");
				navigate({ to: "/dashboard" });
			} else {
				const { data: signUpData, error } = await supabase.auth.signUp({
					email,
					password,
					options: { emailRedirectTo: window.location.origin }
				});
				if (error) throw error;
				if (signUpData.user && signUpData.session === null) {
					toast.success("Account created! Please check your email to confirm your account.");
					setMode("signin");
					return;
				}
				toast.success("Account created. Signing in…");
				const { data: signInData, error: e2 } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (e2) throw e2;
				if (!signInData.user) throw new Error("No user found after sign in");
				const { data: roleRow, error: roleError } = await supabase.from("user_roles").select("role").eq("user_id", signInData.user.id).eq("role", "admin").maybeSingle();
				if (roleError) throw roleError;
				if (!roleRow) {
					await supabase.auth.signOut();
					throw new Error("Access denied. You do not have administrator privileges.");
				}
				navigate({ to: "/dashboard" });
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Authentication failed";
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-obsidian flex items-center justify-center px-6 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed top-[-10%] right-[-10%] w-[50%] h-[40%] bg-gold/5 blur-[120px] pointer-events-none" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 117,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-sm relative z-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "block text-center font-serif text-3xl text-gold mb-2",
					children: "Kach QR Code"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 119,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-center text-[10px] uppercase tracking-[0.3em] text-white/40 mb-12",
					children: "Administrator Access"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 122,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: submit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-[10px] uppercase tracking-[0.2em] text-white/50",
							children: "Email"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 128,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "mt-2 w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none transition-colors"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 129,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 127,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-[10px] uppercase tracking-[0.2em] text-white/50",
							children: "Password"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 132,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "password",
							required: true,
							minLength: 6,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "mt-2 w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none transition-colors"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							disabled: loading,
							type: "submit",
							className: "w-full bg-gold text-obsidian py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-gold-soft disabled:opacity-50 transition-colors mt-8",
							children: loading ? "…" : mode === "signin" ? "Sign In" : "Create Account"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 135,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 126,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
					className: "block w-full mt-6 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-gold transition-colors",
					children: mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 140,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-8 text-center text-[10px] text-white/30 leading-relaxed",
					children: "The first account created automatically receives admin privileges."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 143,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 118,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 116,
		columnNumber: 10
	}, this);
}
//#endregion
export { AuthPage as component };
