import WeatherChatLogo from "./WeatherChatLogo";
import { Link } from "react-router";
import { useCreateNewChat } from "../hooks/chat.js";
import { useContext, useState } from "react";
import { LocalChatStore } from "../context/DataStoreContext.jsx";

function SideBar() {
    const newChat = useCreateNewChat();
    const { data, _ } = useContext(LocalChatStore);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    function handleClick() {
        newChat();
        setIsMobileMenuOpen(false); // Close mobile menu after creating new chat
    }

    function toggleMobileMenu() {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <>
            <button
                onClick={toggleMobileMenu}
                className="lg:hidden fixed top-18 left-4 z-50 bg-slate-900 text-white p-2 rounded-lg shadow-lg"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                w-80 bg-slate-900 h-screen flex flex-col border-r border-slate-700 shadow-xl
                fixed lg:relative z-40
                transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 border-b border-slate-700">
                    <WeatherChatLogo />
                </div>

                <div className="p-4">
                    <button
                        onClick={handleClick}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Chat
                    </button>
                </div>

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
                                onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu when navigating
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

                <div className="p-4 border-t border-slate-700">
                    <div className="text-xs text-slate-500 text-center">
                        Weather Chat Assistant
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;