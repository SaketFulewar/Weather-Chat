import { v4 } from 'uuid';
import { useDataStore } from './useLocalStorage';

export const useCreateNewChat = () => {
  const [data, setData] = useDataStore();
  const createNewChat = (chatTitle) => {
    const chatId = v4();

    const newChat = {
      chatId,
      title: chatTitle || "New Chat",
      chats: [],
    };

    // updating the state
    setData([...data, newChat]);

  };

  return createNewChat;
};
