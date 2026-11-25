import Link from "next/link";
export default function Sidebar({ open, conversations, activeId, user, onNew, onOpen, onDelete, onSettings, onLogout }) {
  return (
    <aside className={`${open ? "flex" : "hidden"} md:flex fixed md:static inset-y-0 left-0 z-20 w-64 shrink-0 flex-col bg-gray-900 text-gray-100`}>
      <button onClick={onNew} className="m-3 p-2 rounded bg-indigo-600 hover:bg-indigo-700">+ New chat</button>
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {conversations.map((c) => (
          <div
            key={c._id}
            onClick={() => onOpen(c._id)}
            className={`flex items-center rounded px-2 py-2 cursor-pointer hover:bg-gray-800 ${activeId === c._id ? "bg-gray-800" : ""}`}
          >
            <span className="flex-1 truncate text-sm">{c.title}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(c._id); }}
              className="text-gray-400 hover:text-red-400 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-700 space-y-2 text-sm">
        <p className="truncate text-gray-400">{user.name}</p>
                {user.role === "admin" && (
          <Link href="/admin" className="block hover:text-indigo-400">Admin panel</Link>
        )}
        <button onClick={onSettings} className="block hover:text-indigo-400">Settings</button>
        <button onClick={onLogout} className="block hover:text-red-400">Logout</button>
      </div>
    </aside>
  );
}