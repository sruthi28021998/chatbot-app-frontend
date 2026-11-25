import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Admin() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "admin") {
      router.replace("/chat");
      return;
    }
    api.get("/admin/stats").then((r) => setStats(r.data)).catch(() => router.replace("/chat"));
  }, [loading, user, router]);

  if (!stats) return <p className="p-6">Loading...</p>;

  const cards = [
    ["Users", stats.users],
    ["Active (7 days)", stats.activeUsers],
    ["Conversations", stats.conversations],
    ["Messages", stats.messages],
    ["👍 Responses", stats.thumbsUp],
    ["👎 Responses", stats.thumbsDown],
    ["Avg response", stats.avgResponseMs ? `${(stats.avgResponseMs / 1000).toFixed(1)}s` : "N/A"],
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link href="/chat" className="text-indigo-500">← Back to chat</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map(([label, value]) => (
          <div key={label} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>
      <h2 className="font-semibold mb-2">Recent users</h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow divide-y dark:divide-gray-700">
        {stats.recentUsers.map((u) => (
          <div key={u._id} className="p-3 flex justify-between text-sm">
            <span>{u.name} ({u.email})</span>
            <span className="text-gray-500">{u.role} · {new Date(u.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}