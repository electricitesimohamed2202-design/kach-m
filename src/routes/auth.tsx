import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({ meta: [{ title: "Admin — Kach QR Code" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (data.user) {
        try {
          const { data: roleRow, error } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", data.user.id)
            .eq("role", "admin")
            .maybeSingle();

          if (error) {
            console.error("Error checking user role:", error);
            return;
          }

          if (roleRow) {
            navigate({ to: "/dashboard" });
          } else {
            // Sign out the non-admin user to clear their session and prevent redirect loop
            await supabase.auth.signOut();
            toast.error("Access denied. You do not have administrator privileges.");
          }
        } catch (err) {
          console.error("Error in auth check:", err);
        }
      }
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (!data.user) throw new Error("No user found");

        const { data: roleRow, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .eq("role", "admin")
          .maybeSingle();

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
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;

        // Some projects require email confirmation. Handle that case gracefully.
        if (signUpData.user && signUpData.session === null) {
          toast.success("Account created! Please check your email to confirm your account.");
          setMode("signin");
          return;
        }

        toast.success("Account created. Signing in…");
        const { data: signInData, error: e2 } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (e2) throw e2;
        if (!signInData.user) throw new Error("No user found after sign in");

        const { data: roleRow, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", signInData.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (roleError) throw roleError;

        if (!roleRow) {
          await supabase.auth.signOut();
          throw new Error("Access denied. You do not have administrator privileges.");
        }

        navigate({ to: "/dashboard" });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-6 py-12">
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[40%] bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="w-full max-w-sm relative z-10">
        <Link to="/" className="block text-center font-serif text-3xl text-gold mb-2">
          Kach QR Code
        </Link>
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-white/40 mb-12">
          Administrator Access
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/50">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/50">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full bg-transparent border border-white/10 px-4 py-3 text-sm text-white focus:border-gold focus:outline-none transition-colors"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-gold text-obsidian py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-gold-soft disabled:opacity-50 transition-colors mt-8"
          >
            {loading ? "…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="block w-full mt-6 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-gold transition-colors"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
        <p className="mt-8 text-center text-[10px] text-white/30 leading-relaxed">
          The first account created automatically receives admin privileges.
        </p>
      </div>
    </div>
  );
}
