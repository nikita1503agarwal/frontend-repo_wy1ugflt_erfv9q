export default function CardGrid({ items = [], type = "businesses" }) {
  if (!items.length) {
    return (
      <div className="text-center text-amber-800/70 py-12">No items yet. Try a different search or add the first one.</div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => (
        <Card key={item.id || item._id} item={item} type={type} />
      ))}
    </div>
  );
}

function Card({ item, type }) {
  const isBusiness = type === "businesses";
  const isProduct = type === "products";
  const isAttraction = type === "attractions";
  const isUpdate = type === "updates";

  return (
    <div className="group rounded-2xl overflow-hidden border border-amber-200 bg-white shadow-sm hover:shadow-md transition">
      <div className="aspect-[16/10] overflow-hidden bg-amber-50">
        <img
          src={item.images?.[0] || `https://images.unsplash.com/photo-1542718610-a1d656d1884a?q=80&w=1200&auto=format&fit=crop`}
          alt={item.name || item.title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-amber-900">
          {item.name || item.title}
        </h3>
        <p className="text-sm text-amber-800/70 line-clamp-2 mt-1">
          {item.description || item.content || "Explore more"}
        </p>
        <div className="mt-3 flex items-center justify-between text-sm text-amber-800/80">
          {isBusiness && <span>{item.town || item.category}</span>}
          {isProduct && (
            <span>
              {item.price ? `GHS ${item.price.toLocaleString()}` : item.category}
            </span>
          )}
          {isAttraction && <span>{item.town || (item.tags?.[0] ?? "")}</span>}
          {isUpdate && <span>{item.town || item.category}</span>}
        </div>
      </div>
    </div>
  );
}
