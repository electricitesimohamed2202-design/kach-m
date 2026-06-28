import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import {
  Search,
  Plus,
  QrCode,
  Edit3,
  Trash2,
  ExternalLink,
  Users,
  ScanLine,
  BarChart3,
  CalendarDays,
  TrendingUp,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { generateQrDataUrl, buildClientUrl } from "@/lib/qr";
import { LuxuryQRCode } from "@/components/luxury-qr-code";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Kach QR Code" }] }),
  component: Dashboard,
});

type Client = Tables<"clients">;

interface ScanWithClient extends Tables<"qr_scans"> {
  clients: {
    business_name: string;
    logo_url: string | null;
    slug: string;
  } | null;
}

function formatUserAgent(ua: string | null): string {
  if (!ua) return "Unknown device";
  const lower = ua.toLowerCase();
  if (lower.includes("iphone")) return "iPhone Visitor";
  if (lower.includes("ipad")) return "iPad Visitor";
  if (lower.includes("android")) return "Android Visitor";
  if (lower.includes("macintosh")) return "Mac Visitor";
  if (lower.includes("windows")) return "Windows Visitor";
  if (lower.includes("linux")) return "Linux Visitor";
  return "Mobile/Desktop";
}

function extractStoragePath(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const parts = url.split("/client-assets/");
    if (parts.length > 1) {
      return parts[1].split("?")[0];
    }
  } catch (e) {
    console.error("Failed to parse URL:", url, e);
  }
  return null;
}

function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [scanCounts, setScanCounts] = useState<Record<string, number>>({});
  const [recentActivity, setRecentActivity] = useState<ScanWithClient[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [qrOpen, setQrOpen] = useState<Client | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [clientToDelete, setClientToDelete] = useState<{ id: string; name: string } | null>(null);

  // Filters, sorting, and pagination
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [stats, setStats] = useState({
    today: 0,
    sevenDays: 0,
    thirtyDays: 0,
    uniqueVisitors: 0,
  });

  const [chartData, setChartData] = useState<Array<{ name: string; Scans: number }>>([]);

  async function load() {
    setLoading(true);
    try {
      const { data: clientsData, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        toast.error(`Error loading clients: ${error.message}`);
        setClients([]);
      } else {
        setClients(clientsData ?? []);
      }

      // Fetch scan rows with user_agent for unique visitor counts
      const { data: scans, error: scansError } = await supabase
        .from("qr_scans")
        .select("client_id, scanned_at, user_agent");

      if (scansError) {
        console.error("Error loading scans:", scansError);
      }

      const counts: Record<string, number> = {};
      let today = 0;
      let sevenDays = 0;
      let thirtyDays = 0;

      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;
      const thirtyDaysAgo = now.getTime() - 30 * 24 * 60 * 60 * 1000;

      const scansTimes = scans as Array<{
        client_id: string;
        scanned_at: string;
        user_agent: string | null;
      }> | null;

      const uniqueVisitsSet = new Set<string>();

      (scansTimes ?? []).forEach((s) => {
        counts[s.client_id] = (counts[s.client_id] ?? 0) + 1;

        const time = new Date(s.scanned_at).getTime();
        if (time >= startOfToday) today++;
        if (time >= sevenDaysAgo) sevenDays++;
        if (time >= thirtyDaysAgo) thirtyDays++;

        // Calculate unique combination of client_id and user_agent
        const uniqueKey = `${s.client_id}_${s.user_agent || "unknown"}`;
        uniqueVisitsSet.add(uniqueKey);
      });

      setScanCounts(counts);
      setStats({
        today,
        sevenDays,
        thirtyDays,
        uniqueVisitors: uniqueVisitsSet.size,
      });

      // Generate 7-day chart data based on full scans log
      const tempChartData: Record<string, number> = {};
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const label = d.toLocaleDateString([], { month: "short", day: "numeric" });
        tempChartData[label] = 0;
      }

      (scansTimes ?? []).forEach((s) => {
        const d = new Date(s.scanned_at);
        const label = d.toLocaleDateString([], { month: "short", day: "numeric" });
        if (tempChartData[label] !== undefined) {
          tempChartData[label]++;
        }
      });

      const formattedChart = Object.entries(tempChartData).map(([name, Scans]) => ({
        name,
        Scans,
      }));
      setChartData(formattedChart);

      // Fetch recent activity scans (join with clients)
      const { data: activity } = await supabase
        .from("qr_scans")
        .select("*, clients(business_name, logo_url, slug)")
        .order("scanned_at", { ascending: false })
        .limit(10);

      setRecentActivity((activity as unknown as ScanWithClient[]) ?? []);
    } catch (err) {
      console.error("Dashboard load failure:", err);
      toast.error("Failed to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [q, categoryFilter]);

  useEffect(() => {
    if (!qrOpen) {
      setQrData(null);
      return;
    }
    generateQrDataUrl(buildClientUrl(qrOpen.slug)).then(setQrData);
  }, [qrOpen]);

  async function remove(id: string, name: string) {
    if (deletingId) return;

    setDeletingId(id);
    try {
      // 1. Fetch full client details first to extract storage URLs for deletion
      const { data: client, error: fetchError } = await supabase
        .from("clients")
        .select("logo_url, cover_url, pdf_url, gallery")
        .eq("id", id)
        .maybeSingle();

      if (fetchError) {
        console.error("Error fetching client details before deletion:", fetchError);
      }

      // 2. Identify storage paths to clean up uploaded assets
      const filesToDelete: string[] = [];
      if (client) {
        const logoPath = extractStoragePath(client.logo_url);
        if (logoPath) filesToDelete.push(logoPath);

        const coverPath = extractStoragePath(client.cover_url);
        if (coverPath) filesToDelete.push(coverPath);

        const pdfPath = extractStoragePath(client.pdf_url);
        if (pdfPath) filesToDelete.push(pdfPath);

        if (client.gallery) {
          try {
            const galleryUrls = Array.isArray(client.gallery)
              ? client.gallery
              : JSON.parse(client.gallery as string);
            if (Array.isArray(galleryUrls)) {
              galleryUrls.forEach((url) => {
                const path = extractStoragePath(url);
                if (path) filesToDelete.push(path);
              });
            }
          } catch (e) {
            console.error("Error parsing gallery urls for deletion:", e);
          }
        }
      }

      // 3. Delete files from Supabase Storage
      if (filesToDelete.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("client-assets")
          .remove(filesToDelete);
        if (storageError) {
          console.error("Failed to delete assets from storage:", storageError);
        } else {
          console.log("Deleted client assets from storage:", filesToDelete);
        }
      }

      // 4. Delete related qr_scans rows to prevent foreign key constraint violations
      const { error: scansError } = await supabase.from("qr_scans").delete().eq("client_id", id);

      if (scansError) {
        console.error("Failed to delete related scan records:", scansError);
        // Continue to delete client even if scans delete had issues, but warn
      }

      // 5. Delete the actual client row
      const { error: deleteError } = await supabase.from("clients").delete().eq("id", id);
      if (deleteError) {
        throw deleteError;
      }

      toast.success(`Client "${name}" was successfully deleted.`);
      setClientToDelete(null);
      await load();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Deletion failed";
      toast.error(`Could not delete client: ${msg}`);
      console.error("Delete client error:", err);
    } finally {
      setDeletingId(null);
    }
  }

  // Filter & sort logic
  let processed = clients.filter((c) => {
    const matchesSearch =
      !q ||
      c.business_name.toLowerCase().includes(q.toLowerCase()) ||
      c.slug.toLowerCase().includes(q.toLowerCase());

    const matchesCategory = categoryFilter === "all" || c.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  processed = [...processed].sort((a, b) => {
    if (sortBy === "name_asc") {
      return a.business_name.localeCompare(b.business_name);
    }
    if (sortBy === "name_desc") {
      return b.business_name.localeCompare(a.business_name);
    }
    if (sortBy === "oldest") {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    if (sortBy === "scans_desc") {
      const scansA = scanCounts[a.id] ?? 0;
      const scansB = scanCounts[b.id] ?? 0;
      return scansB - scansA;
    }
    if (sortBy === "scans_asc") {
      const scansA = scanCounts[a.id] ?? 0;
      const scansB = scanCounts[b.id] ?? 0;
      return scansA - scansB;
    }
    // Default newest
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const totalClients = clients.length;
  const totalQrs = clients.length; // every client has an auto-generated QR
  const totalScans = Object.values(scanCounts).reduce((a, b) => a + b, 0);

  // Pagination slice
  const totalItems = processed.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedClients = processed.slice(startIndex, startIndex + pageSize);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold">
            Management Console
          </p>
          <h1 className="text-3xl font-bold text-white tracking-tight mt-1">Clients Overview</h1>
        </div>
        <Link
          to="/clients/new"
          className="bg-gradient-to-r from-amber-400 to-amber-600 text-black px-5 py-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:from-amber-500 hover:to-amber-700 transition-all flex items-center gap-2 rounded-xl shadow-lg shadow-amber-500/10 cursor-pointer"
        >
          <Plus className="size-3.5 stroke-[2.5]" /> Add Client
        </Link>
      </div>

      {/* Stat cards bento box grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          icon={<Users className="size-4 text-amber-500" />}
          label="Total Clients"
          value={totalClients}
          trend={`${totalQrs} Active QRs`}
        />
        <StatCard
          icon={<BarChart3 className="size-4 text-emerald-400" />}
          label="Total Visitors"
          value={totalScans}
          trend="Total Scans"
        />
        <StatCard
          icon={<ScanLine className="size-4 text-indigo-400" />}
          label="Unique Visitors"
          value={stats.uniqueVisitors}
          trend="Distinct Scans"
        />
        <StatCard
          icon={<TrendingUp className="size-4 text-teal-400" />}
          label="Today"
          value={stats.today}
          trend="Live Scans"
        />
        <StatCard
          icon={<CalendarDays className="size-4 text-sky-400" />}
          label="Last 7 Days"
          value={stats.sevenDays}
          trend="Weekly Scans"
        />
        <StatCard
          icon={<CalendarDays className="size-4 text-violet-400" />}
          label="Last 30 Days"
          value={stats.thirtyDays}
          trend="Monthly Scans"
        />
      </div>

      {/* Analytics Chart */}
      <div className="bg-[#0F0F12]/90 rounded-[2rem] border border-white/5 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-white tracking-widest uppercase">
              Visitor Traffic
            </h2>
            <p className="text-xs text-slate-500 mt-1">QR code scan trends over the last 7 days</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">
              Live updates
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          {loading ? (
            <div className="size-full flex items-center justify-center text-white/20 text-xs font-mono tracking-widest uppercase animate-pulse">
              Generating Analytics Chart...
            </div>
          ) : chartData.length === 0 ? (
            <div className="size-full flex items-center justify-center text-slate-600 text-xs italic">
              No traffic scans recorded.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                <XAxis
                  dataKey="name"
                  stroke="rgba(255, 255, 255, 0.4)"
                  fontSize={10}
                  fontFamily="monospace"
                  tickLine={false}
                />
                <YAxis
                  stroke="rgba(255, 255, 255, 0.4)"
                  fontSize={10}
                  fontFamily="monospace"
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F0F12",
                    borderColor: "rgba(212,175,55,0.3)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontFamily: "sans-serif",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "#D4AF37", fontWeight: "bold" }}
                  labelStyle={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}
                />
                <Area
                  type="monotone"
                  dataKey="Scans"
                  stroke="#D4AF37"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorScans)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Responsive layout with stats and feeds */}
      <div className="grid lg:grid-cols-[1fr_350px] gap-8">
        {/* Left column: Search and Client list */}
        <div className="space-y-6">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search clients by name or slug…"
                className="w-full bg-[#0F0F12]/80 border border-white/5 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none transition-all rounded-xl shadow-inner"
              />
            </div>

            {/* Filter and Sorting Row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category select filter */}
              <div className="flex items-center gap-2 bg-[#0F0F12]/80 border border-white/5 px-4 py-2.5 rounded-xl text-sm text-slate-400">
                <SlidersHorizontal className="size-3.5 text-amber-500" />
                <span className="text-xs uppercase tracking-wider font-semibold">Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer text-xs"
                >
                  <option value="all" className="bg-neutral-950 text-white">
                    All Categories
                  </option>
                  {[
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
                    "Other",
                  ].map((cat) => (
                    <option key={cat} value={cat} className="bg-neutral-950 text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort filter */}
              <div className="flex items-center gap-2 bg-[#0F0F12]/80 border border-white/5 px-4 py-2.5 rounded-xl text-sm text-slate-400">
                <ArrowUpDown className="size-3.5 text-amber-500" />
                <span className="text-xs uppercase tracking-wider font-semibold">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer text-xs"
                >
                  <option value="newest" className="bg-neutral-950 text-white">
                    Newest Created
                  </option>
                  <option value="oldest" className="bg-neutral-950 text-white">
                    Oldest Created
                  </option>
                  <option value="name_asc" className="bg-neutral-950 text-white">
                    Business Name (A-Z)
                  </option>
                  <option value="name_desc" className="bg-neutral-950 text-white">
                    Business Name (Z-A)
                  </option>
                  <option value="scans_desc" className="bg-neutral-950 text-white">
                    Most Visited
                  </option>
                  <option value="scans_asc" className="bg-neutral-950 text-white">
                    Least Visited
                  </option>
                </select>
              </div>

              {/* Page size filter */}
              <div className="flex items-center gap-2 bg-[#0F0F12]/80 border border-white/5 px-4 py-2.5 rounded-xl text-sm text-slate-400 sm:ml-auto">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                  Show:
                </span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-transparent text-white focus:outline-none cursor-pointer text-xs"
                >
                  <option value={5} className="bg-neutral-950 text-white">
                    5 Profiles
                  </option>
                  <option value={10} className="bg-neutral-950 text-white">
                    10 Profiles
                  </option>
                  <option value={20} className="bg-neutral-950 text-white">
                    20 Profiles
                  </option>
                  <option value={50} className="bg-neutral-950 text-white">
                    50 Profiles
                  </option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="border border-white/5 bg-[#0F0F12]/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 animate-pulse"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="size-12 rounded-full bg-white/5 border border-white/5" />
                    <div className="space-y-2 flex-1 max-w-[200px]">
                      <div className="h-4 bg-white/10 rounded w-3/4" />
                      <div className="h-3 bg-white/5 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-auto justify-end">
                    <div className="h-6 w-16 bg-white/5 rounded-full" />
                    <div className="size-9 bg-white/5 rounded-lg" />
                    <div className="size-9 bg-white/5 rounded-lg" />
                    <div className="size-9 bg-white/5 rounded-lg" />
                    <div className="size-9 bg-white/5 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : paginatedClients.length === 0 ? (
            <div className="text-center py-16 px-6 border border-dashed border-amber-500/20 bg-amber-500/5 rounded-[2rem] space-y-4">
              <div className="size-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto">
                <Users className="size-8 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-white">
                  {clients.length === 0 ? "No Premium Profiles Yet" : "No Match Found"}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto">
                  {clients.length === 0
                    ? "Establish your luxury client portfolio. Create dynamic, luxury-themed business profiles with bespoke high-resolution QR codes."
                    : "No clients match your current search queries or filters. Try adjusting your category or search term."}
                </p>
              </div>
              {clients.length === 0 ? (
                <Link
                  to="/clients/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10"
                >
                  <Plus className="size-3.5 stroke-[2.5]" /> Create First Client Profile
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setQ("");
                    setCategoryFilter("all");
                  }}
                  className="px-4 py-2 border border-white/10 hover:border-white/30 text-white rounded-xl text-xs uppercase tracking-wider font-semibold bg-white/5 transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <ul className="space-y-3">
                {paginatedClients.map((c) => (
                  <li
                    key={c.id}
                    className="group border border-white/5 bg-[#0F0F12]/40 hover:border-amber-500/30 transition-all duration-300 rounded-2xl hover:bg-[#0F0F12]/80 overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
                      <div className="flex min-w-0 items-center gap-4 flex-1">
                        <div className="shrink-0 size-12 rounded-full border border-amber-500/30 overflow-hidden bg-black flex items-center justify-center">
                          {c.logo_url ? (
                            <img src={c.logo_url} alt="" className="size-full object-cover" />
                          ) : (
                            <div className="size-full grid place-items-center text-amber-500/40 text-[10px]">
                              ★
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg text-white truncate group-hover:text-amber-400 transition-colors">
                            {c.business_name}
                          </h3>
                          <p className="text-[11px] text-white/40 truncate font-mono">
                            /c/{c.slug}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:ml-auto shrink-0 justify-end">
                        <span
                          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-amber-500 border border-amber-500/20 px-2.5 py-1 rounded-full bg-amber-500/5"
                          title="Unique visits counter"
                        >
                          <Users className="size-3" /> {scanCounts[c.id] ?? 0}
                        </span>
                        <IconBtn onClick={() => setQrOpen(c)} title="QR Code">
                          <QrCode className="size-4" />
                        </IconBtn>
                        <IconBtn
                          as={Link}
                          to="/c/$slug"
                          params={{ slug: c.slug }}
                          target="_blank"
                          title="View profile page"
                        >
                          <ExternalLink className="size-4" />
                        </IconBtn>
                        <IconBtn
                          as={Link}
                          to="/clients/$id"
                          params={{ id: c.id }}
                          title="Edit profile details"
                        >
                          <Edit3 className="size-4" />
                        </IconBtn>
                        <IconBtn
                          onClick={() => setClientToDelete({ id: c.id, name: c.business_name })}
                          title="Delete client profile"
                          danger
                          disabled={deletingId !== null}
                        >
                          <Trash2 className="size-4" />
                        </IconBtn>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
                  <div className="text-xs text-slate-500">
                    Showing <span className="text-white font-medium">{startIndex + 1}</span> to{" "}
                    <span className="text-white font-medium">
                      {Math.min(startIndex + pageSize, totalItems)}
                    </span>{" "}
                    of <span className="text-white font-medium">{totalItems}</span> clients
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 border border-white/10 hover:border-amber-500/30 rounded-xl bg-white/5 text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                      title="Previous Page"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <div className="text-xs font-mono text-slate-400">
                      Page <span className="text-amber-500 font-bold">{currentPage}</span> of{" "}
                      <span>{totalPages}</span>
                    </div>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-white/10 hover:border-amber-500/30 rounded-xl bg-white/5 text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                      title="Next Page"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right column: Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-[#0F0F12] rounded-[2rem] border border-white/5 p-6 flex flex-col gap-6">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/clients/new"
                className="w-full py-4 px-5 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 rounded-2xl flex items-center justify-between group shadow-xl shadow-amber-900/20 text-black cursor-pointer transition-all duration-300 font-bold text-xs uppercase"
              >
                <span>New Client Profile</span>
                <Plus className="w-4 h-4 text-black group-hover:scale-110 transition-transform stroke-[2.5]" />
              </Link>

              <a
                href="/"
                target="_blank"
                className="w-full py-4 px-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-between transition-colors text-white"
              >
                <span className="text-xs font-bold uppercase">View Public Site</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-[#0F0F12] rounded-[2rem] border border-white/5 p-6 flex flex-col gap-6">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase">
              Recent Activity
            </h3>
            {recentActivity.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No activity detected yet.</p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const clientName = activity.clients?.business_name ?? "Deleted client";
                  return (
                    <div
                      key={activity.id}
                      className="flex gap-3 text-xs border-b border-white/5 pb-3.5 last:border-0 last:pb-0"
                    >
                      <div className="size-8 rounded-full bg-amber-500/5 border border-amber-500/20 flex items-center justify-center text-[10px] text-amber-500 shrink-0 overflow-hidden">
                        {activity.clients?.logo_url ? (
                          <img
                            src={activity.clients.logo_url}
                            alt=""
                            className="size-full object-cover"
                          />
                        ) : (
                          "★"
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white/80 font-medium truncate">
                          Visit to{" "}
                          <span className="text-amber-500 font-semibold">{clientName}</span>
                        </p>
                        <p className="text-[10px] text-white/40 mt-1 flex flex-wrap gap-x-1.5 items-center">
                          <span>{formatUserAgent(activity.user_agent)}</span>
                          <span>•</span>
                          <span>
                            {new Date(activity.scanned_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {qrOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md grid place-items-center p-4 overflow-y-auto"
          onClick={() => setQrOpen(null)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl my-8">
            <LuxuryQRCode
              url={buildClientUrl(qrOpen.slug)}
              businessName={qrOpen.business_name}
              logoUrl={qrOpen.logo_url}
              category={qrOpen.category}
              onClose={() => setQrOpen(null)}
            />
          </div>
        </div>
      )}

      {/* Premium Deletion Confirmation Modal */}
      {clientToDelete && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md grid place-items-center p-4 overflow-y-auto"
          onClick={() => setClientToDelete(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0F0F12]/95 border border-red-500/20 rounded-[2rem] p-6 text-center space-y-6 shadow-2xl relative overflow-hidden"
          >
            {/* Subtle premium glow effect in the modal */}
            <div className="absolute -top-12 -left-12 size-36 bg-red-500/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-12 -right-12 size-36 bg-red-500/10 blur-3xl rounded-full" />

            <div className="relative z-10 space-y-4">
              <div className="size-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
                <Trash2 className="size-7 text-red-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-white">Delete Client Profile?</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Are you absolutely sure you want to permanently delete{" "}
                  <strong className="text-white font-semibold">"{clientToDelete.name}"</strong>?
                </p>
                <p className="text-[10.5px] text-red-400/80 bg-red-500/5 border border-red-500/10 rounded-xl p-3 leading-normal mt-3">
                  This will permanently delete all client details, QR codes, visitor statistics, and
                  all uploaded images from storage. This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 relative z-10">
              <button
                type="button"
                onClick={() => setClientToDelete(null)}
                className="flex-1 px-5 py-3 border border-white/10 hover:border-white/20 text-white rounded-xl text-xs uppercase tracking-wider font-semibold bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
              >
                No, Keep Profile
              </button>
              <button
                type="button"
                onClick={() => remove(clientToDelete.id, clientToDelete.name)}
                disabled={deletingId !== null}
                className="flex-1 px-5 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-40 text-white rounded-xl text-xs uppercase tracking-wider font-bold transition-all shadow-lg shadow-red-500/15 flex items-center justify-center gap-2 cursor-pointer"
              >
                {deletingId === clientToDelete.id ? (
                  <>
                    <span className="animate-spin inline-block size-3.5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete Profile</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  trend?: string;
}) {
  return (
    <div className="bg-white/5 rounded-3xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">{icon}</div>
        {trend && (
          <span className="text-[9px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-lg">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-white tracking-tighter">{value.toLocaleString()}</p>
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">
          {label}
        </p>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  danger,
  as: As = "button",
  ...rest
}: {
  children: React.ReactNode;
  danger?: boolean;
  as?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  params?: Record<string, string>;
  to?: string;
  onClick?: () => void;
  target?: string;
  title?: string;
  disabled?: boolean;
}) {
  const Component = As as React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <Component
      {...(rest as any)} // eslint-disable-line @typescript-eslint/no-explicit-any
      className={`p-2.5 transition-all rounded-lg disabled:opacity-30 disabled:pointer-events-none ${danger ? "text-white/40 hover:text-red-400 hover:bg-red-500/5" : "text-white/50 hover:text-gold hover:bg-gold/5"}`}
    >
      {children}
    </Component>
  );
}
