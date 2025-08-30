import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import ChatBubble from "./ChatBubble";
import { LocalChatStore } from "../context/DataStoreContext";
export default function ChatBox() {
  const today = new Date();
  const [input, setInput] = useState("");


  const { data, setData } = useContext(LocalChatStore);
  const [currentChat, setCurrentChat] = useState([]);
  let id = useParams();

  function getSessionChatData() {
    let filterdData = Array.isArray(data)
      ? data.find((c) => c.chatId === id.chatId)
      : null;

    if (filterdData) setCurrentChat(filterdData);

  }

  function updateChatHistory() {
    setData(prev => ([
      ...prev,
        currentChat
    ]));
  }

  useEffect(() => {
    getSessionChatData();

    return () => {
      updateChatHistory();
    };
  }, [id.chatId]);
  

  function storeMessage(msg, isUser) {
    setCurrentChat(prevChat => ({
      ...prevChat,
      chats: [
        ...(prevChat.chats || []),  // Fallback to empty array if chats is undefined
        {
          isUser: isUser,
          time: today.getTime(),
          message: msg,
        }
      ]
    }));
  }

  function handleClick() {
    if (!input.trim()) return;

    storeMessage(input, true);
    setInput(''); // Clear the input after sending

  // ... rest of your code
  }

  return (
    <div className="flex justify-center h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex flex-col h-screen w-full max-w-4xl bg-white">

        {/* Chat Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h2 className="text-lg font-semibold text-slate-800">Weather Assistant</h2>
            </div>
            <div className="text-sm text-slate-500">
              {currentChat?.chats?.length || 0} messages
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div
          className="flex-1 overflow-y-auto p-6 space-y-4"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e1 transparent'
          }}
        >
          {currentChat?.chats?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">Start a conversation</h3>
              <p className="text-slate-500 max-w-md">
                Ask me about the weather, climate conditions, or any weather-related questions you have.
              </p>
            </div>
          ) : (
            currentChat?.chats?.map((item, i) => (
              <ChatBubble key={i} message={item.message} isUser={item.isUser} />
            ))
          )}
        </div>

        {/* Input Section */}
        <div className="bg-white border-t border-slate-200 p-4 shadow-lg">
          <div className="flex items-end gap-3 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white shadow-sm transition-all duration-200 placeholder-slate-400"
                placeholder="Ask about weather conditions..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleClick();
                  }
                }}
              />
              {input.trim() && (
                <button
                  type="button"
                  onClick={() => setInput('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <button
              type="submit"
              onClick={handleClick}
              disabled={!input.trim()}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg ${input.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl transform hover:-translate-y-0.5'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send
            </button>
          </div>

          {/* Quick Actions (Optional) */}
          <div className="flex gap-2 mt-3 flex-wrap">
            <button
              onClick={() => setInput("What's the weather like today?")}
              className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors duration-200"
            >
              Today's weather
            </button>
            <button
              onClick={() => setInput("7-day forecast")}
              className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors duration-200"
            >
              Weekly forecast
            </button>
            <button
              onClick={() => setInput("Weather alerts")}
              className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors duration-200"
            >
              Weather alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
