export default function MessageBubble({ message, botName, onRate }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isUser ? "bg-indigo-600 text-white" : "bg-white dark:bg-gray-800 shadow"
        }`}
      >
        {!isUser && <p className="text-xs font-semibold text-indigo-500 mb-1">{botName}</p>}
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        {!isUser && message._id && (
          <div className="flex gap-3 mt-2 text-sm">
            <button
              onClick={() => onRate(message._id, message.rating === 1 ? 0 : 1)}
              className={message.rating === 1 ? "opacity-100" : "opacity-40 hover:opacity-100"}
            >
              👍
            </button>
            <button
              onClick={() => onRate(message._id, message.rating === -1 ? 0 : -1)}
              className={message.rating === -1 ? "opacity-100" : "opacity-40 hover:opacity-100"}
            >
              👎
            </button>
          </div>
        )}
      </div>
    </div>
  );
}