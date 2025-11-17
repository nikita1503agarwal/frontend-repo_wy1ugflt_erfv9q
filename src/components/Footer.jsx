export default function Footer() {
  return (
    <footer className="mt-10 border-t border-amber-200/60 bg-gradient-to-tr from-orange-50 via-amber-50 to-rose-50">
      <div className="max-w-6xl mx-auto px-4 py-8 text-amber-900/80 text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>
          Made with love in the Eastern Region • Celebrating culture, craft, and community
        </p>
        <p className="opacity-75">© {new Date().getFullYear()} East Link Connect</p>
      </div>
    </footer>
  );
}
