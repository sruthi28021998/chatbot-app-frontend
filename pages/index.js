import ChatWindow from "../components/ChatWindow";

export default function Home() {
  return (
    <div className="h-screen flex flex-col max-w-3xl mx-auto">
      <header className="p-4 border-b dark:border-gray-700 font-bold">AI Chatbot</header>
      <ChatWindow />
    </div>
  );
}