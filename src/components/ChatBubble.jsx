export default function ChatBubble({ message, isUser }) {
  return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-lg px-4 py-2 rounded-lg break-words
          ${
            isUser
              ? "bg-blue-500 text-white rounded-br-none items-start"
              : "bg-gray-200 text-gray-900 rounded-bl-none justify-end"
          }`}
      >
        {message}
      </div>
      </div>
  );
}
