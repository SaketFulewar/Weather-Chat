// useCreateNewChat.js
import { useContext } from "react";
import { useNavigate } from "react-router";
import { createNewChatSession } from "../utils/chatModel.js";
import { LocalChatStore } from "../context/DataStoreContext.jsx";

export const useCreateNewChat = () => {
  const { _, setData } = useContext(LocalChatStore);
  const navigate = useNavigate();

  return () => {
    const date = new Date();
    const newChat = createNewChatSession(date.getTime());
    setData(prev => [...prev, newChat]);
    navigate(`/chat/${newChat.chatId}`, { replace: true });
  };
};

// export const useUpdateMsg = ({{msg, sessionId, sender}}) =>{
//   console.log(msg)
// }