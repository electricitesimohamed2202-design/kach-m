import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileUpload } from "@/components/file-upload";
import { LUXURY_THEMES, getThemeById } from "@/lib/themes";
import { toast } from "sonner";
import { ArrowLeft, User, Shield, Palette, Sparkles, Mail, Lock, Check } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Admin Settings — Kach QR Code" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [adminTheme, setAdminTheme] = useState("obsidian");
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile Form States
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);

  // Email Form States
  const [email, setEmail] = useState("");
  const [emailSaving, setEmailSaving] = useState(false);

  // Password Form States
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  // Theme State
  const [selectedTheme, setSelectedTheme] = useState("obsidian");
  const [themeSaving, setThemeSaving] = useState(false);

  useEffect(() => {
    // Load local first to prevent flash
    const localTheme = localStorage.getItem("admin-theme");
    if (localTheme) {
      setAdminTheme(localTheme);
      setSelectedTheme(localTheme);
    }

    // Sync with database
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

    // Listen to theme changes from layout
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

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          avatar_url: avatarUrl,
        },
      });
      if (error) throw error;
      window.dispatchEvent(new Event("admin-profile-updated"));
      toast.success("Profile details updated successfully.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update profile details";
      toast.error(message);
    } finally {
      setProfileSaving(false);
    }
  }

  async function handleUpdateEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email || email === user?.email) return;
    setEmailSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) throw error;
      toast.success("Email update confirmation sent to your email address.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update email";
      toast.error(message);
    } finally {
      setEmailSaving(false);
    }
  }

  async function handleUpdatePassword(e: React.FormEvent) {
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update password";
      toast.error(message);
    } finally {
      setPasswordSaving(false);
    }
  }

  async function handleChangeTheme(themeId: string) {
    setSelectedTheme(themeId);
    setThemeSaving(true);
    try {
      localStorage.setItem("admin-theme", themeId);
      window.dispatchEvent(new Event("admin-theme-changed"));

      const { error } = await supabase.auth.updateUser({
        data: { theme: themeId },
      });
      if (error) throw error;
      toast.success(`Theme successfully updated to ${getThemeById(themeId).name}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update theme preference";
      toast.error(message);
    } finally {
      setThemeSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="text-white/50 text-center py-20 uppercase tracking-[0.2em] text-xs">
        Loading settings…
      </div>
    );
  }

  const theme = getThemeById(adminTheme);

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-gold mb-4 transition-colors"
          >
            <ArrowLeft className="size-3" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-4xl text-white">System Settings</h1>
            <Sparkles className="size-5 text-amber-500 opacity-60" />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            Configure your administrator account profile, credentials, and dashboard appearance.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Navigation Sidebar inside settings */}
        <div className="md:col-span-1 space-y-3">
          <div className="bg-[#0F0F12]/80 backdrop-blur-xl border border-white/5 p-4 rounded-2xl">
            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-4">
              Administrator
            </p>
            <div className="flex items-center gap-3 mb-6">
              <div className="size-12 rounded-full border border-amber-500/30 p-0.5 bg-slate-800 flex items-center justify-center font-bold text-amber-500 text-sm overflow-hidden shadow-inner shrink-0">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="size-full object-cover" />
                ) : (
                  fullName.substring(0, 2).toUpperCase() || "AD"
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white leading-tight truncate">
                  {fullName || "Admin User"}
                </p>
                <p className="text-[10px] text-slate-400 leading-normal truncate">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <a
                href="#profile-section"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <User className="size-4 opacity-75" />
                <span>Profile Details</span>
              </a>
              <a
                href="#email-section"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Mail className="size-4 opacity-75" />
                <span>Email Address</span>
              </a>
              <a
                href="#security-section"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Lock className="size-4 opacity-75" />
                <span>Change Password</span>
              </a>
              <a
                href="#theme-section"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Palette className="size-4 opacity-75" />
                <span>Dashboard Theme</span>
              </a>
            </div>
          </div>
        </div>

        {/* Settings Forms Column */}
        <div className="md:col-span-2 space-y-8">
          {/* PROFILE DETAILS CARD */}
          <section
            id="profile-section"
            className="bg-[#0F0F12]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 space-y-6"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-white/5">
              <User className="size-4.5 text-amber-500" />
              <h2 className="font-serif text-xl text-white">Profile Details</h2>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <FileUpload
                    label="Administrator Photo / Avatar"
                    value={avatarUrl}
                    onChange={(url) => setAvatarUrl(url)}
                    folder="avatars"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="bg-gold text-obsidian px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-gold-soft disabled:opacity-40 transition-colors rounded-lg gold-glow"
                >
                  {profileSaving ? "Saving details…" : "Save Profile Details"}
                </button>
              </div>
            </form>
          </section>

          {/* EMAIL ADDRESS CARD */}
          <section
            id="email-section"
            className="bg-[#0F0F12]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 space-y-6"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-white/5">
              <Mail className="size-4.5 text-amber-500" />
              <h2 className="font-serif text-xl text-white">Email Address</h2>
            </div>

            <form onSubmit={handleUpdateEmail} className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors rounded-lg"
                />
                <p className="text-[10px] text-slate-500 mt-2">
                  Note: Updating your email address will require confirming the change via links
                  sent to both addresses.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={emailSaving || email === user?.email}
                  className="bg-gold text-obsidian px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-gold-soft disabled:opacity-40 transition-colors rounded-lg gold-glow"
                >
                  {emailSaving ? "Saving email…" : "Update Email Address"}
                </button>
              </div>
            </form>
          </section>

          {/* SECURITY / CHANGE PASSWORD CARD */}
          <section
            id="security-section"
            className="bg-[#0F0F12]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 space-y-6"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-white/5">
              <Shield className="size-4.5 text-amber-500" />
              <h2 className="font-serif text-xl text-white">Change Password</h2>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 block mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={passwordSaving || !newPassword}
                  className="bg-gold text-obsidian px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-gold-soft disabled:opacity-40 transition-colors rounded-lg gold-glow"
                >
                  {passwordSaving ? "Updating password…" : "Change Password"}
                </button>
              </div>
            </form>
          </section>

          {/* DASHBOARD SYSTEM THEME CARD */}
          <section
            id="theme-section"
            className="bg-[#0F0F12]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 space-y-6"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-white/5">
              <Palette className="size-4.5 text-amber-500" />
              <h2 className="font-serif text-xl text-white">Dashboard Theme</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {LUXURY_THEMES.map((t) => {
                const isActive = selectedTheme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleChangeTheme(t.id)}
                    className={`group relative p-3 border text-left transition-all duration-300 rounded-xl overflow-hidden ${
                      isActive
                        ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5"
                        : "border-white/10 hover:border-white/30 bg-white/[0.01]"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-2 right-2 bg-amber-500 text-black rounded-full p-0.5 z-10">
                        <Check className="size-3" strokeWidth={3} />
                      </div>
                    )}
                    <div
                      className={`h-12 w-full bg-gradient-to-br ${t.swatch} rounded-lg mb-2 transition-transform duration-300 group-hover:scale-[1.02]`}
                    />
                    <span className="text-[11px] font-semibold text-white group-hover:text-amber-400 transition-colors block">
                      {t.name}
                    </span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-medium">
                      {t.isLight ? "Light Mode" : "Dark Mode"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
