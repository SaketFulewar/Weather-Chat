import { sideBarButton } from "./Buttons";
import WeatherChatLogo from "./WeatherChatLogo";
import { useEffect, useContext, useState } from "react";
import { LocalChatStore } from "../context/DataStoreContext";
import { createNewChat } from "../utils/createNewChat";
import { Link } from "react-router";
function SideBar() {
  const { data, setData } = useContext(LocalChatStore);
  const handleNewChat = () => {
    const newChat = createNewChat("Nagpur Temprature");
    setData([...data, newChat]);
  };

  return (
    <div className="lg:w-1/5 sm:w-1 bg-green-500 h-screen">
      <div className="w-full p-2">
        <WeatherChatLogo />
      </div>
      <div className="p-3">
        <button onClick={handleNewChat}>New Chat</button>
      </div>
      {/* chat history section */}
      <div className="chat-history flex flex-col">
        {data.map((ele) => {
          return <Link key={ele.chatId} to={`/chat/${ele.chatId}`} onClick={handleChat}>
            {ele.title}
          </Link>;
        })}
      </div>
    </div>
  );
}

export default SideBar;
