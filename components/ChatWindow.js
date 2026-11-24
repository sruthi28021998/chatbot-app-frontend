import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import { getSocket } from "../utils/socket";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ conversation, botName, onSaved }) {
  const [messages, setMessages] = useState(conversation?.messages || []);
  const [convoId, setConvoId] = useState(conversation?._id || null);
  const [category, setCategory] = useState(conversation?.category || "casual");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    const socket = getSocket();

    const onAI = ({ conversationId, message }) => {
      setConvoId(conversationId);
      setMessages((prev) => [...prev, message]);
      setLoading(false);
      onSaved(conversationId);
    };
    const onErr = (msg) => {
      setError(msg);
      setLoading(false);
    };
    const onConnectError = () => {
      setError("Connection failed. Please log in again.");
      setLoading(false);
    };

    socket.on("ai_message", onAI);
    socket.on("chat_error", onErr);
    socket.on("connect_error", onConnectError);
    return () => {
      socket.off("ai_message", onAI);
      socket.off("chat_error", onErr);
      socket.off("connect_error", onConnectError);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    setError("");
    getSocket().emit("send_message", { conversationId: convoId, content: text, category });
  };

  const rate = async (messageId, rating) => {
    try {
      await api.put(`/chat/${convoId}/rate`, { messageId, rating });
      setMessages((prev) => prev.map((m) => (m._id === messageId ? { ...m, rating } : m)));
    } catch (e) {
      setError("Could not save rating.");
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-3 border-b dark:border-gray-700 flex items-center gap-2 text-sm">
        <span>Style:</span>
        <select
          value={category}
          disabled={!!convoId}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-1 dark:bg-gray-800 dark:border-gray-600 disabled:opacity-60"
        >
          <option value="casual">Casual</option>
          <option value="professional">Professional</option>
          <option value="creative">Creative</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-center text-gray-500 mt-20">Say hello to {botName} 👋</p>
        )}
        {messages.map((m, i) => (
          <MessageBubble key={m._id || i} message={m} botName={botName} onRate={rate} />
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 shadow rounded-2xl px-4 py-2 text-gray-500 animate-pulse">
              {botName} is typing...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {error && <p className="px-4 text-sm text-red-500">{error}</p>}

      <form onSubmit={send} className="p-3 border-t dark:border-gray-700 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          maxLength={2000}
          className="flex-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
        />
        <button
          disabled={loading || !input.trim()}
          className="px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}