import { Search, MapPin, ShoppingBag, Building2, Landmark, Newspaper } from "lucide-react";

export default function Header({ q, setQ, active, setActive }) {
  const tabs = [
    { key: "businesses", label: "Businesses", icon: Building2 },
    { key: "products", label: "Products", icon: ShoppingBag },
    { key: "attractions", label: "Attractions", icon: Landmark },
    { key: "updates", label: "Updates", icon: Newspaper },
  ];

  return (
    <header className="bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 border-b border-orange-200/50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold shadow-sm">ELC</div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-amber-900">East Link Connect</h1>
            <p className="text-amber-800/70 text-sm">Discover products, culture, and opportunities across the Eastern Region</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-700/60" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search businesses, products, towns..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 backdrop-blur border border-amber-200/70 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 placeholder:text-amber-700/50"
            />
          </div>
          <a
            href="https://maps.google.com?q=Eastern%20Region%2C%20Ghana"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-700 text-white font-semibold hover:bg-amber-800 transition"
          >
            <MapPin className="h-5 w-5" /> Map
          </a>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const selected = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border transition ${
                  selected
                    ? "bg-amber-600 text-white border-amber-700"
                    : "bg-white text-amber-900 border-amber-200 hover:bg-amber-50"
                }`}
              >
                <Icon className="h-4 w-4" /> {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
