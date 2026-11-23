import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await register(form.name, form.email, form.password);
      router.push("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Create account</h1>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <input required placeholder="Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
        <input type="email" required placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
        <input type="password" required minLength={6} placeholder="Password (min 6 chars)" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
        <button disabled={busy} className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 disabled:opacity-50">
          {busy ? "Please wait..." : "Sign up"}
        </button>
        <p className="text-sm text-center">
          Have an account? <Link href="/login" className="text-indigo-500">Login</Link>
        </p>
      </form>
    </div>
  );
}