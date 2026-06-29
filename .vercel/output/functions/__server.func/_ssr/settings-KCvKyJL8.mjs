import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DXjAb9eS.mjs";
import { i as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs--tanstack-react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as getThemeById, t as LUXURY_THEMES } from "./themes-BuFZdXWu.mjs";
import { D as Lock, H as Check, J as Sparkles, T as Mail, b as Palette, i as User, q as ArrowLeft, u as Shield } from "../_libs/lucide-react.mjs";
import { t as FileUpload } from "./file-upload-Dzg96qNv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-KCvKyJL8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/settings.tsx?tsr-split=component";
function SettingsPage() {
	const [adminTheme, setAdminTheme] = (0, import_react.useState)("obsidian");
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)(null);
	const [profileSaving, setProfileSaving] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [emailSaving, setEmailSaving] = (0, import_react.useState)(false);
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [passwordSaving, setPasswordSaving] = (0, import_react.useState)(false);
	const [selectedTheme, setSelectedTheme] = (0, import_react.useState)("obsidian");
	const [themeSaving, setThemeSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const localTheme = localStorage.getItem("admin-theme");
		if (localTheme) {
			setAdminTheme(localTheme);
			setSelectedTheme(localTheme);
		}
		supabase.auth.getUser().then(({ data }) => {
			if (data.user) {
				setUser(data.user);
				setFullName(data.user.user_metadata?.full_name || "");
				setAvatarUrl(data.user.user_metadata?.avatar_url || null);
				setEmail(data.user.email || "");
				const dbTheme = data.user?.user_metadata?.theme;
				if (dbTheme) {
					setAdminTheme(dbTheme);
					setSelectedTheme(dbTheme);
					localStorage.setItem("admin-theme", dbTheme);
				}
			}
			setLoading(false);
		});
		const handleThemeChange = () => {
			const updatedTheme = localStorage.getItem("admin-theme") || "obsidian";
			setAdminTheme(updatedTheme);
			setSelectedTheme(updatedTheme);
		};
		window.addEventListener("admin-theme-changed", handleThemeChange);
		return () => {
			window.removeEventListener("admin-theme-changed", handleThemeChange);
		};
	}, []);
	async function handleUpdateProfile(e) {
		e.preventDefault();
		setProfileSaving(true);
		try {
			const { error } = await supabase.auth.updateUser({ data: {
				full_name: fullName,
				avatar_url: avatarUrl
			} });
			if (error) throw error;
			window.dispatchEvent(new Event("admin-profile-updated"));
			toast.success("Profile details updated successfully.");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to update profile details";
			toast.error(message);
		} finally {
			setProfileSaving(false);
		}
	}
	async function handleUpdateEmail(e) {
		e.preventDefault();
		if (!email || email === user?.email) return;
		setEmailSaving(true);
		try {
			const { error } = await supabase.auth.updateUser({ email });
			if (error) throw error;
			toast.success("Email update confirmation sent to your email address.");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to update email";
			toast.error(message);
		} finally {
			setEmailSaving(false);
		}
	}
	async function handleUpdatePassword(e) {
		e.preventDefault();
		if (!newPassword) return;
		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match.");
			return;
		}
		if (newPassword.length < 6) {
			toast.error("Password must be at least 6 characters.");
			return;
		}
		setPasswordSaving(true);
		try {
			const { error } = await supabase.auth.updateUser({ password: newPassword });
			if (error) throw error;
			setNewPassword("");
			setConfirmPassword("");
			toast.success("Password updated successfully.");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to update password";
			toast.error(message);
		} finally {
			setPasswordSaving(false);
		}
	}
	async function handleChangeTheme(themeId) {
		setSelectedTheme(themeId);
		setThemeSaving(true);
		try {
			localStorage.setItem("admin-theme", themeId);
			window.dispatchEvent(new Event("admin-theme-changed"));
			const { error } = await supabase.auth.updateUser({ data: { theme: themeId } });
			if (error) throw error;
			toast.success(`Theme successfully updated to ${getThemeById(themeId).name}`);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to update theme preference";
			toast.error(message);
		} finally {
			setThemeSaving(false);
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "text-white/50 text-center py-20 uppercase tracking-[0.2em] text-xs",
		children: "Loading settings…"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 161,
		columnNumber: 12
	}, this);
	getThemeById(adminTheme);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "max-w-4xl mx-auto space-y-12 animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/dashboard",
					className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-gold mb-4 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 171,
						columnNumber: 13
					}, this), " Back to Dashboard"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 170,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-serif text-4xl text-white",
						children: "System Settings"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 174,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-5 text-amber-500 opacity-60" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 175,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 173,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-slate-400 mt-1.5",
					children: "Configure your administrator account profile, credentials, and dashboard appearance."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 177,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 169,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 168,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid md:grid-cols-3 gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "md:col-span-1 space-y-3",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-[#0F0F12]/80 backdrop-blur-xl border border-white/5 p-4 rounded-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-4",
							children: "Administrator"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 187,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "size-12 rounded-full border border-amber-500/30 p-0.5 bg-slate-800 flex items-center justify-center font-bold text-amber-500 text-sm overflow-hidden shadow-inner shrink-0",
								children: avatarUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: avatarUrl,
									alt: "Avatar",
									className: "size-full object-cover"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 30
								}, this) : fullName.substring(0, 2).toUpperCase() || "AD"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 191,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm font-semibold text-white leading-tight truncate",
									children: fullName || "Admin User"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 195,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[10px] text-slate-400 leading-normal truncate",
									children: user?.email
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 198,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 194,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: "#profile-section",
									className: "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "size-4 opacity-75" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 204,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Profile Details" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 205,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 203,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: "#email-section",
									className: "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-4 opacity-75" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 208,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Email Address" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 209,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 207,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: "#security-section",
									className: "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "size-4 opacity-75" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 212,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Change Password" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 213,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 211,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: "#theme-section",
									className: "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Palette, { className: "size-4 opacity-75" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 216,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Dashboard Theme" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 217,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 215,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 202,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 186,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 185,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "md:col-span-2 space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						id: "profile-section",
						className: "bg-[#0F0F12]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 pb-4 border-b border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "size-4.5 text-amber-500" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 228,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-serif text-xl text-white",
								children: "Profile Details"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 229,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 227,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
							onSubmit: handleUpdateProfile,
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "sm:col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileUpload, {
										label: "Administrator Photo / Avatar",
										value: avatarUrl,
										onChange: (url) => setAvatarUrl(url),
										folder: "avatars"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 235,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 234,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-2",
										children: "Full Name"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 238,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "text",
										value: fullName,
										onChange: (e) => setFullName(e.target.value),
										placeholder: "Enter full name",
										className: "w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors rounded-lg"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 241,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 237,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 233,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex justify-end pt-2",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "submit",
									disabled: profileSaving,
									className: "bg-gold text-obsidian px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-gold-soft disabled:opacity-40 transition-colors rounded-lg gold-glow",
									children: profileSaving ? "Saving details…" : "Save Profile Details"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 245,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 232,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 226,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						id: "email-section",
						className: "bg-[#0F0F12]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 pb-4 border-b border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-4.5 text-amber-500" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 256,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-serif text-xl text-white",
								children: "Email Address"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 257,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 255,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
							onSubmit: handleUpdateEmail,
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-2",
									children: "Email Address"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 262,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "Enter email address",
									required: true,
									className: "w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors rounded-lg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 265,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[10px] text-slate-500 mt-2",
									children: "Note: Updating your email address will require confirming the change via links sent to both addresses."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 266,
									columnNumber: 17
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 261,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex justify-end pt-2",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "submit",
									disabled: emailSaving || email === user?.email,
									className: "bg-gold text-obsidian px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-gold-soft disabled:opacity-40 transition-colors rounded-lg gold-glow",
									children: emailSaving ? "Saving email…" : "Update Email Address"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 273,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 272,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 260,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 254,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						id: "security-section",
						className: "bg-[#0F0F12]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 pb-4 border-b border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "size-4.5 text-amber-500" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 283,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-serif text-xl text-white",
								children: "Change Password"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 284,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 282,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
							onSubmit: handleUpdatePassword,
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-2",
									children: "New Password"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 290,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "password",
									value: newPassword,
									onChange: (e) => setNewPassword(e.target.value),
									placeholder: "At least 6 characters",
									className: "w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors rounded-lg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 293,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 289,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-2",
									children: "Confirm New Password"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 296,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "password",
									value: confirmPassword,
									onChange: (e) => setConfirmPassword(e.target.value),
									placeholder: "Repeat new password",
									className: "w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors rounded-lg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 299,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 295,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 288,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex justify-end pt-2",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "submit",
									disabled: passwordSaving || !newPassword,
									className: "bg-gold text-obsidian px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-gold-soft disabled:opacity-40 transition-colors rounded-lg gold-glow",
									children: passwordSaving ? "Updating password…" : "Change Password"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 304,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 303,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 287,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 281,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						id: "theme-section",
						className: "bg-[#0F0F12]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 pb-4 border-b border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Palette, { className: "size-4.5 text-amber-500" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 314,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-serif text-xl text-white",
								children: "Dashboard Theme"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 315,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 313,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
							children: LUXURY_THEMES.map((t) => {
								const isActive = selectedTheme === t.id;
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => handleChangeTheme(t.id),
									className: `group relative p-3 border text-left transition-all duration-300 rounded-xl overflow-hidden ${isActive ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5" : "border-white/10 hover:border-white/30 bg-white/[0.01]"}`,
									children: [
										isActive && /* @__PURE__ */ (void 0)("div", {
											className: "absolute top-2 right-2 bg-amber-500 text-black rounded-full p-0.5 z-10",
											children: /* @__PURE__ */ (void 0)(Check, {
												className: "size-3",
												strokeWidth: 3
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 323,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 322,
											columnNumber: 34
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `h-12 w-full bg-gradient-to-br ${t.swatch} rounded-lg mb-2 transition-transform duration-300 group-hover:scale-[1.02]` }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 325,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[11px] font-semibold text-white group-hover:text-amber-400 transition-colors block",
											children: t.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 326,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[9px] text-slate-500 uppercase tracking-widest block font-medium",
											children: t.isLight ? "Light Mode" : "Dark Mode"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 329,
											columnNumber: 21
										}, this)
									]
								}, t.id, true, {
									fileName: _jsxFileName,
									lineNumber: 321,
									columnNumber: 22
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 318,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 312,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 224,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 183,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 166,
		columnNumber: 10
	}, this);
}
//#endregion
export { SettingsPage as component };
