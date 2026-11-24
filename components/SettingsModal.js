import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function SettingsModal({ onClose }) {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user.settings.chatbotName);
  const [theme, setTheme] = useState(user.settings.theme);
  const [error, setError] = useState("");

  const save = async () => {
    try {
      const { data } = await api.put("/auth/settings", { chatbotName: name, theme });
      setUser(data);
      onClose();
    } catch (e) {
      setError("Could not save settings.");
    }
  };

  return (
    <div className="fixed inset-0 z-30 bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold">Settings</h2>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <label className="block text-sm">
          Chatbot name
          <input
            value={name}
            maxLength={30}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </label>
        <label className="block text-sm">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="mt-1 w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded border dark:border-gray-600">Cancel</button>
          <button onClick={save} className="px-3 py-1 rounded bg-indigo-600 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}