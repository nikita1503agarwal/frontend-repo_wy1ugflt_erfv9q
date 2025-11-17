import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import CardGrid from "./components/CardGrid";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Stories from "./components/Stories";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function App() {
  const [active, setActive] = useState("businesses");
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  const endpoint = useMemo(() => {
    switch (active) {
      case "businesses":
        return "/api/businesses";
      case "products":
        return "/api/products";
      case "attractions":
        return "/api/attractions";
      case "updates":
        return "/api/updates";
      default:
        return "/api/businesses";
    }
  }, [active]);

  useEffect(() => {
    // try hydrate user from token
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => (r.ok ? r.json() : null))
        .then((u) => u && setUser(u))
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      try {
        const url = `${API}${endpoint}${q ? `?q=${encodeURIComponent(q)}` : ""}`;
        const res = await fetch(url);
        const data = await res.json();
        if (!ignore) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!ignore) setItems([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [API, endpoint, q]);

  return (
    <div className="min-h-screen bg-[linear-gradient(120deg,#fff7ed,#fff1f2)] text-amber-900">
      <Header q={q} setQ={setQ} active={active} setActive={setActive} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="rounded-2xl p-5 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60">
            <h2 className="text-lg font-semibold">Explore Eastern Region</h2>
            <p className="text-amber-800/70 text-sm mt-1">
              Discover local products, hidden attractions, and cultural experiences across Aburi, Akropong, Mampong, Larteh, and more.
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            {user ? (
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-amber-200 text-sm">
                <span className="inline-block h-6 w-6 rounded-full bg-amber-600 text-white text-xs font-bold grid place-items-center">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </span>
                <span>{user.name || user.email}</span>
              </div>
            ) : (
              <button onClick={() => setAuthOpen(true)} className="px-4 py-2 rounded-xl bg-amber-700 text-white font-semibold hover:bg-amber-800 transition">
                Login / Create account
              </button>
            )}
          </div>
        </div>

        <Stories />

        {loading ? (
          <div className="py-16 text-center text-amber-800/70">Loading...</div>
        ) : (
          <CardGrid items={items} type={active} />
        )}
      </main>

      <Footer />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthed={(u) => setUser(u)} />
    </div>
  );
}
