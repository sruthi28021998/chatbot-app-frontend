import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(form.email, form.password);
      router.push("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Welcome back</h1>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <input type="email" required placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
        <input type="password" required placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
        <button disabled={busy} className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 disabled:opacity-50">
          {busy ? "Please wait..." : "Login"}
        </button>
        <p className="text-sm text-center">
          No account? <Link href="/register" className="text-indigo-500">Sign up</Link>
        </p>
      </form>
    </div>
  );
}