import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Stories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch(`${API}/stories`);
        const data = await res.json();
        if (!ignore) setStories(Array.isArray(data) ? data.slice(0, 12) : []);
      } catch (e) {
        if (!ignore) setStories([]);
      }
    }
    load();
    return () => { ignore = true };
  }, []);

  if (!stories.length) return null;

  return (
    <div className="relative overflow-x-auto no-scrollbar py-3">
      <div className="flex gap-3">
        {stories.map((s) => (
          <StoryChip key={s.id} story={s} />
        ))}
      </div>
    </div>
  );
}

function StoryChip({ story }) {
  const img = story.images?.[0] || `https://images.unsplash.com/photo-1517817748496-1c33d64012ed?q=80&w=600&auto=format&fit=crop`;
  const town = story.town || "Eastern Region";
  return (
    <div className="shrink-0 w-28">
      <div className="relative w-28 h-28 rounded-2xl overflow-hidden ring-2 ring-amber-600/80 shadow-sm">
        <img src={img} alt={story.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
      </div>
      <div className="mt-1 text-xs font-medium text-amber-900 truncate" title={story.title}>{town}</div>
    </div>
  );
}
