import {
  createFileRoute,
  Outlet,
  redirect,
  Link,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, LayoutDashboard, Plus, Palette, QrCode, Menu, X, Settings } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { LUXURY_THEMES, getThemeById } from "@/lib/themes";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [adminTheme, setAdminTheme] = useState("obsidian");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMetadata, setUserMetadata] = useState<{ fullName?: string; avatarUrl?: string }>({});

  useEffect(() => {
    // Close mobile menu on route changes
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      setUserMetadata({
        fullName: data.user.user_metadata?.full_name,
        avatarUrl: data.user.user_metadata?.avatar_url,
      });
    }
  };

  useEffect(() => {
    // Load local first to prevent flash
    const localTheme = localStorage.getItem("admin-theme");
    if (localTheme) {
      setAdminTheme(localTheme);
    }

    fetchUser();

    // Sync with Supabase Auth metadata
    supabase.auth.getUser().then(({ data }) => {
      const dbTheme = data.user?.user_metadata?.theme;
      if (dbTheme && dbTheme !== localTheme) {
        setAdminTheme(dbTheme);
        localStorage.setItem("admin-theme", dbTheme);
      }
    });

    const handleThemeChange = () => {
      const updatedTheme = localStorage.getItem("admin-theme") || "obsidian";
      setAdminTheme(updatedTheme);
    };

    window.addEventListener("admin-theme-changed", handleThemeChange);
    window.addEventListener("admin-profile-updated", fetchUser);

    return () => {
      window.removeEventListener("admin-theme-changed", handleThemeChange);
      window.removeEventListener("admin-profile-updated", fetchUser);
    };
  }, []);

  async function changeAdminTheme(themeId: string) {
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
    navigate({ to: "/auth", replace: true });
  }

  const theme = getThemeById(adminTheme);

  return (
    <div
      className={`min-h-screen ${theme.bgClass} ${theme.textClass} flex transition-colors duration-500 relative overflow-x-hidden`}
    >
      {/* ambient glows */}
      <div
        className={`fixed top-[-15%] right-[-15%] w-[70%] h-[50%] ${theme.glowColor1} blur-[140px] pointer-events-none transition-all duration-500 z-0`}
      />
      <div
        className={`fixed bottom-[-10%] left-[-10%] w-[60%] h-[40%] ${theme.glowColor2} blur-[120px] pointer-events-none transition-all duration-500 z-0`}
      />

      {/* PERSISTENT LUXURY SIDEBAR (Desktop) */}
      <aside
        className={`hidden md:flex flex-col w-64 bg-[#0F0F12]/90 backdrop-blur-xl border-r ${theme.cardBorder} h-screen sticky top-0 z-40 transition-colors duration-500 shrink-0`}
      >
        {/* Branding */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-200 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
            <QrCode className="w-5 h-5 text-black" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">KACH QR</h1>
            <p className="text-[9px] text-amber-500 uppercase font-semibold tracking-widest">
              Luxury Edition
            </p>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 px-4 space-y-1.5 mt-6">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
              pathname === "/dashboard"
                ? "bg-white/5 text-white border-white/10 shadow-sm"
                : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 opacity-70" />
            <span className="text-xs font-medium uppercase tracking-[0.1em]">Dashboard</span>
          </Link>

          <Link
            to="/clients/new"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
              pathname === "/clients/new"
                ? "bg-white/5 text-white border-white/10 shadow-sm"
                : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Plus className="w-4 h-4 opacity-70" />
            <span className="text-xs font-medium uppercase tracking-[0.1em]">Add Client</span>
          </Link>

          <Link
            to="/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
              pathname === "/settings"
                ? "bg-white/5 text-white border-white/10 shadow-sm"
                : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings className="w-4 h-4 opacity-70" />
            <span className="text-xs font-medium uppercase tracking-[0.1em]">Settings</span>
          </Link>
        </nav>

        {/* Active Theme widget & Sign out at the bottom of sidebar */}
        <div className="p-4 space-y-4">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-3 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-500" /> Active Theme
            </p>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-3 h-3 rounded-full shrink-0 ${theme.isLight ? "bg-[#B3923B]" : "bg-amber-500"} shadow-[0_0_8px_rgba(245,158,11,0.5)]`}
                />
                <span className="text-[11px] text-white font-medium italic truncate">
                  {theme.name}
                </span>
              </div>
              <select
                value={adminTheme}
                onChange={(e) => changeAdminTheme(e.target.value)}
                className="bg-transparent text-white/50 hover:text-white focus:outline-none cursor-pointer font-sans text-[10px] max-w-[80px]"
              >
                {LUXURY_THEMES.map((t) => (
                  <option key={t.id} value={t.id} className="bg-neutral-950 text-white">
                    {t.name.split(" ")[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-xl text-xs font-medium uppercase tracking-[0.1em] transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* MOBILE NAV DRAWER (COLLAPSED ON DESKTOP) */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sliding Panel */}
        <aside
          className={`absolute top-0 left-0 w-72 max-w-[85vw] h-full bg-[#0F0F12]/95 backdrop-blur-xl border-r ${theme.cardBorder} flex flex-col p-6 shadow-2xl transition-transform duration-300 transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header of Drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-200 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                <QrCode className="w-4 h-4 text-black" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-xs font-bold text-white tracking-tight">KACH QR</h2>
                <p className="text-[8px] text-amber-500 uppercase font-semibold tracking-widest">
                  Luxury Edition
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Drawer Nav links */}
          <nav className="flex-1 space-y-2 mt-8">
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 ${
                pathname === "/dashboard"
                  ? "bg-white/5 text-white border-white/10 shadow-sm"
                  : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 opacity-70" />
              <span className="text-xs font-semibold uppercase tracking-[0.1em]">Dashboard</span>
            </Link>

            <Link
              to="/clients/new"
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 ${
                pathname === "/clients/new"
                  ? "bg-white/5 text-white border-white/10 shadow-sm"
                  : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Plus className="w-4 h-4 opacity-70" />
              <span className="text-xs font-semibold uppercase tracking-[0.1em]">Add Client</span>
            </Link>

            <Link
              to="/settings"
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 ${
                pathname === "/settings"
                  ? "bg-white/5 text-white border-white/10 shadow-sm"
                  : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Settings className="w-4 h-4 opacity-70" />
              <span className="text-xs font-semibold uppercase tracking-[0.1em]">Settings</span>
            </Link>
          </nav>

          {/* Drawer Footer / Theme Selection & Logout */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            <div className="bg-white/5 rounded-xl p-3.5 border border-white/5">
              <p className="text-[8px] text-slate-500 uppercase font-bold tracking-widest mb-2.5 flex items-center gap-1.5">
                <Palette className="w-3 h-3 text-amber-500" /> Theme Selection
              </p>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${theme.isLight ? "bg-[#B3923B]" : "bg-amber-500"} shadow-[0_0_8px_rgba(245,158,11,0.5)]`}
                  />
                  <span className="text-[10px] text-white font-medium italic truncate">
                    {theme.name}
                  </span>
                </div>
                <select
                  value={adminTheme}
                  onChange={(e) => changeAdminTheme(e.target.value)}
                  className="bg-transparent text-white/75 hover:text-white focus:outline-none cursor-pointer font-sans text-[10px] uppercase tracking-wider"
                >
                  {LUXURY_THEMES.map((t) => (
                    <option key={t.id} value={t.id} className="bg-neutral-950 text-white">
                      {t.name.split(" ")[0]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={signOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-xl text-xs font-medium uppercase tracking-[0.1em] transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </aside>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* TOP HEADER BAR */}
        <header
          className={`h-16 border-b ${theme.cardBorder} px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 ${theme.bgClass}/80 backdrop-blur-md`}
        >
          {/* Left part: Mobile Branding & Hamburger Menu Toggle / Desktop Breadcrumbs */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile hamburger & branding */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus:outline-none cursor-pointer shrink-0"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-200 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
                  <QrCode className="w-4 h-4 text-black" strokeWidth={2.5} />
                </div>
                <span
                  className={`font-serif text-base ${theme.accentText} font-bold tracking-tight truncate max-w-[100px] xs:max-w-none`}
                >
                  Kach QR
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2.5">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                Global Overview
              </span>
              <span className="text-white/20">/</span>
              <span
                className={`text-[10px] uppercase tracking-widest font-bold ${theme.accentText}`}
              >
                {pathname === "/dashboard"
                  ? "Analytical Dashboard"
                  : pathname === "/settings"
                    ? "System Settings"
                    : "Add Client Profile"}
              </span>
            </div>
          </div>

          {/* Right part: Connection Status & Master user badge */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                Connected to Supabase
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-semibold text-white leading-tight">
                  {userMetadata.fullName || "Admin User"}
                </p>
                <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">
                  Master Account
                </p>
              </div>

              {/* Admin Avatar */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-amber-500/30 p-0.5 shrink-0 overflow-hidden bg-slate-800">
                {userMetadata.avatarUrl ? (
                  <img
                    src={userMetadata.avatarUrl}
                    alt="Admin"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full flex items-center justify-center font-bold text-amber-500 text-xs shadow-inner">
                    {(userMetadata.fullName || "AD").substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8 pb-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
