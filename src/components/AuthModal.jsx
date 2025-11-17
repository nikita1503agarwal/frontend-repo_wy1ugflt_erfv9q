import { useState } from "react";

export default function AuthModal({ open, onClose, onAuthed }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const API = import.meta.env.VITE_BACKEND_URL || "";

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "register") {
        const res = await fetch(`${API}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        if (!res.ok) throw new Error((await res.json()).detail || "Registration failed");
        const data = await res.json();
        localStorage.setItem("token", data.access_token);
        onAuthed?.(data.user);
        onClose();
      } else {
        const form = new URLSearchParams();
        form.append("username", email);
        form.append("password", password);
        const res = await fetch(`${API}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: form.toString(),
        });
        if (!res.ok) throw new Error((await res.json()).detail || "Login failed");
        const data = await res.json();
        localStorage.setItem("token", data.access_token);
        onAuthed?.(data.user);
        onClose();
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
        <div className="p-5 border-b bg-gradient-to-r from-amber-100 to-rose-100">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-amber-900">{mode === "login" ? "Login" : "Create account"}</h3>
            <button onClick={onClose} className="text-amber-800/70 hover:text-amber-900">✕</button>
          </div>
          <p className="text-sm text-amber-800/70">Access East Link Connect to follow communities and share updates.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          {mode === "register" && (
            <div>
              <label className="text-sm text-amber-800/80">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 rounded-xl border border-amber-200 px-3 py-2" required />
            </div>
          )}
          <div>
            <label className="text-sm text-amber-800/80">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 rounded-xl border border-amber-200 px-3 py-2" required />
          </div>
          <div>
            <label className="text-sm text-amber-800/80">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 rounded-xl border border-amber-200 px-3 py-2" required />
          </div>
          {error && <div className="text-sm text-rose-600">{error}</div>}
          <button disabled={loading} className="w-full py-2 rounded-xl bg-amber-600 text-white font-semibold disabled:opacity-60">
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
          </button>
          <p className="text-sm text-center text-amber-800/70">
            {mode === "login" ? (
              <>
                No account?{' '}
                <button type="button" onClick={() => setMode("register")} className="text-amber-800 underline">Create one</button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button type="button" onClick={() => setMode("login")} className="text-amber-800 underline">Login</button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
