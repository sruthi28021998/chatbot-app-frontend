import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const SettingsModal = dynamic(() => import("../components/SettingsModal"), { ssr: false });

export default function Chat() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [conversations, setConversations] = useState([]);
  const [active, setActive] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [chatKey, setChatKey] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  const loadList = async () => {
    const { data } = await api.get("/chat");
    setConversations(data);
  };

  useEffect(() => {
    if (user) loadList();
  }, [user]);

  const openChat = async (id) => {
    const { data } = await api.get(`/chat/${id}`);
    setActive(data);
    setActiveId(id);
    setChatKey((k) => k + 1);
    setSidebarOpen(false);
  };

  const newChat = () => {
    setActive(null);
    setActiveId(null);
    setChatKey((k) => k + 1);
    setSidebarOpen(false);
  };

  const removeChat = async (id) => {
    if (!window.confirm("Delete this chat?")) return;
    await api.delete(`/chat/${id}`);
    if (activeId === id) newChat();
    loadList();
  };

  const handleSaved = (id) => {
    setActiveId(id);
    loadList();
  };

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (loading || !user) return <p className="p-6">Loading...</p>;

  return (
    <div className="h-[100dvh] flex">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 z-10 bg-black/40"
        />
      )}
      <Sidebar
        open={sidebarOpen}
        conversations={conversations}
        activeId={activeId}
        user={user}
        onNew={newChat}
        onOpen={openChat}
        onDelete={removeChat}
        onSettings={() => setShowSettings(true)}
        onLogout={handleLogout}
      />
      <main className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden p-2 border-b dark:border-gray-700">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">☰</button>
        </div>
        <ChatWindow
          key={chatKey}
          conversation={active}
          botName={user.settings.chatbotName}
          onSaved={handleSaved}
        />
      </main>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}