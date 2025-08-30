import { sideBarButton } from "./Buttons";
import WeatherChatLogo from "./WeatherChatLogo";
import { useEffect, useContext, useState } from "react";
import { LocalChatStore } from "../context/DataStoreContext";
import { createNewChat } from "../utils/createNewChat";
import { Link, useNavigate } from "react-router";
function SideBar() {
  const navigate = useNavigate()
  const { data, setData } = useContext(LocalChatStore);
  const handleNewChat = () => {
    const newChat = createNewChat("Nagpur Temprature");
    setData(prev => [...prev, newChat]);
    navigate(`/chat/${newChat.chatId}`, { replace: true })
  };

  return (
    <div className="w-80 bg-slate-900 h-screen flex flex-col border-r border-slate-700 shadow-xl">
      {/* Header Section */}
      <div className="p-6 border-b border-slate-700">
        <WeatherChatLogo />
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={handleNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Chat
        </button>
      </div>

      {/* Chat History Section */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-4 pb-2">
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">
            Recent Chats
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
          {data?.map((ele) => (
            <Link
              key={ele.chatId}
              to={`/chat/${ele.chatId}`}
              className="block px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 group border border-transparent hover:border-slate-600"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-slate-500 group-hover:text-slate-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm font-medium truncate">
                  {ele.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Section (Optional) */}
      <div className="p-4 border-t border-slate-700">
        <div className="text-xs text-slate-500 text-center">
          Weather Chat Assistant
        </div>
      </div>
    </div>
  );
}

export default SideBar;
