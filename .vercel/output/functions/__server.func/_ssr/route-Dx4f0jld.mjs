import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DXjAb9eS.mjs";
import { i as require_react, n as useQueryClient } from "../_libs/react+tanstack__react-query.mjs";
import { F as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as getThemeById, t as LUXURY_THEMES } from "./themes-BuFZdXWu.mjs";
import { C as Menu, E as LogOut, O as LayoutDashboard, _ as QrCode, b as Palette, f as Settings, n as X, v as Plus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-Dx4f0jld.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/route.tsx?tsr-split=component";
function AdminLayout() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [adminTheme, setAdminTheme] = (0, import_react.useState)("obsidian");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, import_react.useState)(false);
	const [userMetadata, setUserMetadata] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);
	const fetchUser = async () => {
		const { data } = await supabase.auth.getUser();
		if (data?.user) setUserMetadata({
			fullName: data.user.user_metadata?.full_name,
			avatarUrl: data.user.user_metadata?.avatar_url
		});
	};
	(0, import_react.useEffect)(() => {
		const localTheme = localStorage.getItem("admin-theme");
		if (localTheme) setAdminTheme(localTheme);
		fetchUser();
		supabase.auth.getUser().then(({ data }) => {
			const dbTheme = data.user?.user_metadata?.theme;
			if (dbTheme && dbTheme !== localTheme) {
				setAdminTheme(dbTheme);
				localStorage.setItem("admin-theme", dbTheme);
			}
		});
		const handleThemeChange = () => {
			setAdminTheme(localStorage.getItem("admin-theme") || "obsidian");
		};
		window.addEventListener("admin-theme-changed", handleThemeChange);
		window.addEventListener("admin-profile-updated", fetchUser);
		return () => {
			window.removeEventListener("admin-theme-changed", handleThemeChange);
			window.removeEventListener("admin-profile-updated", fetchUser);
		};
	}, []);
	async function changeAdminTheme(themeId) {
		setAdminTheme(themeId);
		localStorage.setItem("admin-theme", themeId);
		window.dispatchEvent(new Event("admin-theme-changed"));
		await supabase.auth.updateUser({ data: { theme: themeId } });
		toast.success(`Theme switched to ${getThemeById(themeId).name}`);
	}
	async function signOut() {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	const theme = getThemeById(adminTheme);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `min-h-screen ${theme.bgClass} ${theme.textClass} flex transition-colors duration-500 relative overflow-x-hidden`,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `fixed top-[-15%] right-[-15%] w-[70%] h-[50%] ${theme.glowColor1} blur-[140px] pointer-events-none transition-all duration-500 z-0` }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 87,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `fixed bottom-[-10%] left-[-10%] w-[60%] h-[40%] ${theme.glowColor2} blur-[120px] pointer-events-none transition-all duration-500 z-0` }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 88,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: `hidden md:flex flex-col w-64 bg-[#0F0F12]/90 backdrop-blur-xl border-r ${theme.cardBorder} h-screen sticky top-0 z-40 transition-colors duration-500 shrink-0`,
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-6 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-10 h-10 bg-gradient-to-br from-amber-200 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QrCode, {
								className: "w-5 h-5 text-black",
								strokeWidth: 2.5
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 95,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 94,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "text-sm font-bold text-white tracking-tight",
							children: "KACH QR"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 98,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[9px] text-amber-500 uppercase font-semibold tracking-widest",
							children: "Luxury Edition"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 93,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						className: "flex-1 px-4 space-y-1.5 mt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/dashboard",
								className: `flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${pathname === "/dashboard" ? "bg-white/5 text-white border-white/10 shadow-sm" : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LayoutDashboard, { className: "w-4 h-4 opacity-70" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 108,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-medium uppercase tracking-[0.1em]",
									children: "Dashboard"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 109,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/clients/new",
								className: `flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${pathname === "/clients/new" ? "bg-white/5 text-white border-white/10 shadow-sm" : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "w-4 h-4 opacity-70" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 113,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-medium uppercase tracking-[0.1em]",
									children: "Add Client"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 114,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 112,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/settings",
								className: `flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${pathname === "/settings" ? "bg-white/5 text-white border-white/10 shadow-sm" : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Settings, { className: "w-4 h-4 opacity-70" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 118,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-medium uppercase tracking-[0.1em]",
									children: "Settings"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 119,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 117,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-white/5 rounded-2xl p-4 border border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-3 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Palette, { className: "w-3.5 h-3.5 text-amber-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 127,
									columnNumber: 15
								}, this), " Active Theme"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `w-3 h-3 rounded-full shrink-0 ${theme.isLight ? "bg-[#B3923B]" : "bg-amber-500"} shadow-[0_0_8px_rgba(245,158,11,0.5)]` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 131,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[11px] text-white font-medium italic truncate",
										children: theme.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 132,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 130,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
									value: adminTheme,
									onChange: (e) => changeAdminTheme(e.target.value),
									className: "bg-transparent text-white/50 hover:text-white focus:outline-none cursor-pointer font-sans text-[10px] max-w-[80px]",
									children: LUXURY_THEMES.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: t.id,
										className: "bg-neutral-950 text-white",
										children: t.name.split(" ")[0]
									}, t.id, false, {
										fileName: _jsxFileName,
										lineNumber: 137,
										columnNumber: 41
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 129,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 125,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: signOut,
							className: "w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-xl text-xs font-medium uppercase tracking-[0.1em] transition-all cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 145,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Sign out" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 146,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 144,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 124,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 91,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: `fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute inset-0 bg-black/80 backdrop-blur-sm",
					onClick: () => setIsMobileMenuOpen(false)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 154,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					className: `absolute top-0 left-0 w-72 max-w-[85vw] h-full bg-[#0F0F12]/95 backdrop-blur-xl border-r ${theme.cardBorder} flex flex-col p-6 shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between pb-6 border-b border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-9 h-9 bg-gradient-to-br from-amber-200 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QrCode, {
										className: "w-4 h-4 text-black",
										strokeWidth: 2.5
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 162,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 161,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "text-xs font-bold text-white tracking-tight",
									children: "KACH QR"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 165,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[8px] text-amber-500 uppercase font-semibold tracking-widest",
									children: "Luxury Edition"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 160,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setIsMobileMenuOpen(false),
								className: "p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 172,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 159,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
							className: "flex-1 space-y-2 mt-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/dashboard",
									className: `flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 ${pathname === "/dashboard" ? "bg-white/5 text-white border-white/10 shadow-sm" : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LayoutDashboard, { className: "w-4 h-4 opacity-70" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 179,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-semibold uppercase tracking-[0.1em]",
										children: "Dashboard"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 180,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 178,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/clients/new",
									className: `flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 ${pathname === "/clients/new" ? "bg-white/5 text-white border-white/10 shadow-sm" : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "w-4 h-4 opacity-70" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 184,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-semibold uppercase tracking-[0.1em]",
										children: "Add Client"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 185,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 183,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/settings",
									className: `flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 ${pathname === "/settings" ? "bg-white/5 text-white border-white/10 shadow-sm" : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Settings, { className: "w-4 h-4 opacity-70" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 189,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-semibold uppercase tracking-[0.1em]",
										children: "Settings"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 190,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 188,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 177,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4 pt-6 border-t border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "bg-white/5 rounded-xl p-3.5 border border-white/5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[8px] text-slate-500 uppercase font-bold tracking-widest mb-2.5 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Palette, { className: "w-3 h-3 text-amber-500" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 198,
										columnNumber: 17
									}, this), " Theme Selection"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 197,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `w-2.5 h-2.5 rounded-full shrink-0 ${theme.isLight ? "bg-[#B3923B]" : "bg-amber-500"} shadow-[0_0_8px_rgba(245,158,11,0.5)]` }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 202,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] text-white font-medium italic truncate",
											children: theme.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 203,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 201,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
										value: adminTheme,
										onChange: (e) => changeAdminTheme(e.target.value),
										className: "bg-transparent text-white/75 hover:text-white focus:outline-none cursor-pointer font-sans text-[10px] uppercase tracking-wider",
										children: LUXURY_THEMES.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: t.id,
											className: "bg-neutral-950 text-white",
											children: t.name.split(" ")[0]
										}, t.id, false, {
											fileName: _jsxFileName,
											lineNumber: 208,
											columnNumber: 43
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 207,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 200,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 196,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: signOut,
								className: "w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-xl text-xs font-medium uppercase tracking-[0.1em] transition-all cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 216,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Sign out" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 217,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 195,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 157,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 152,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 flex flex-col min-h-screen relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
					className: `h-16 border-b ${theme.cardBorder} px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 ${theme.bgClass}/80 backdrop-blur-md`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 sm:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex md:hidden items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
								className: "p-2 -ml-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus:outline-none cursor-pointer shrink-0",
								"aria-label": "Toggle navigation menu",
								children: isMobileMenuOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 232,
									columnNumber: 37
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 232,
									columnNumber: 64
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 231,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-8 h-8 bg-gradient-to-br from-amber-200 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QrCode, {
										className: "w-4 h-4 text-black",
										strokeWidth: 2.5
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 236,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 235,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: `font-serif text-base ${theme.accentText} font-bold tracking-tight truncate max-w-[100px] xs:max-w-none`,
									children: "Kach QR"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 238,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 234,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 230,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "hidden sm:flex items-center gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] text-slate-500 uppercase tracking-widest font-bold",
									children: "Global Overview"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-white/20",
									children: "/"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 248,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: `text-[10px] uppercase tracking-widest font-bold ${theme.accentText}`,
									children: pathname === "/dashboard" ? "Analytical Dashboard" : pathname === "/settings" ? "System Settings" : "Add Client Profile"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 249,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 228,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-4 sm:gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 258,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] font-semibold text-emerald-400 uppercase tracking-wider",
								children: "Connected to Supabase"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 259,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 257,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "hidden sm:block text-right",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs font-semibold text-white leading-tight",
									children: userMetadata.fullName || "Admin User"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 266,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[9px] text-slate-500 uppercase tracking-wider font-bold",
									children: "Master Account"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 269,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 265,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-amber-500/30 p-0.5 shrink-0 overflow-hidden bg-slate-800",
								children: userMetadata.avatarUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: userMetadata.avatarUrl,
									alt: "Admin",
									className: "w-full h-full object-cover rounded-full"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 276,
									columnNumber: 43
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-full h-full rounded-full flex items-center justify-center font-bold text-amber-500 text-xs shadow-inner",
									children: (userMetadata.fullName || "AD").substring(0, 2).toUpperCase()
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 276,
									columnNumber: 146
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 275,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 264,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 256,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 226,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
					className: "flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 pb-24",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 286,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 285,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 224,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 85,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminLayout as component };
