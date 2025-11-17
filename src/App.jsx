import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import CardGrid from "./components/CardGrid";
import Footer from "./components/Footer";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function App() {
  const [active, setActive] = useState("businesses");
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <section className="mb-6">
          <div className="rounded-2xl p-5 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60">
            <h2 className="text-lg font-semibold">Explore Akuapem</h2>
            <p className="text-amber-800/70 text-sm mt-1">
              Discover local products, hidden attractions, and cultural experiences across Aburi, Akropong, Mampong, Larteh, and more.
            </p>
          </div>
        </section>

        {loading ? (
          <div className="py-16 text-center text-amber-800/70">Loading...</div>
        ) : (
          <CardGrid items={items} type={active} />
        )}
      </main>

      <Footer />
    </div>
  );
}
