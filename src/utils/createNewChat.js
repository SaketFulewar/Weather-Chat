import { v4 } from "uuid";
const date = new Date()
export function createNewChat(title){
    const newChat = {
      chatId: v4(),
      time: date.getTime(),
      title: title,
      chats: [],
    };

    return newChat
}

