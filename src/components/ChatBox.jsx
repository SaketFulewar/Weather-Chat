import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import ChatBubble from "./ChatBubble";
import { LocalChatStore } from "../context/DataStoreContext";
export default function ChatBox() {
  const today = new Date();
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("")
  const { data, setData } = useContext(LocalChatStore);
  const [currentChat, setCurrentChat] = useState([]);
  let id = useParams();

  function updateChatHistory() {
    setData(...data, currentChat);
  }

  useEffect(() => {
    alert(id);
    getChatData();
    // return console.log(currentChat + 'thiisssssss')
  }, []);

  function getChatData() {
    let filterdData = data.find((c) => c.chatId === url);

    setCurrentChat(filterdData);
  }

  function storeMessage(msg, isUser) {
    console.log(currentChat.chats);
    currentChat.chats.push({
      isUser: isUser,
      time: today.getTime(),
      message: msg,
    });
  }

  function handleClick() {
    storeMessage(input, true);
    // let data = await fetch(url, {
    //   method: "POST",
    //   headers: headers,
    //   body: JSON.stringify(payload),
    // });

    // data = await data.json();
    alert();
  }
  return (
    <div className="flex justify-center h-screen lg:w-screen bg-yellow-500">
      <div className="flex w-1/2 flex-col h-screen">
        <div
          className={`p-2 w-full mb-2`}
          style={{
            height: "calc(100% - 3rem)",
            overflow: "auto",
          }}
        >
          {currentChat.chats?.map((item, i) => {
            return <ChatBubble message={item} isUser={true} />;
          })}
        </div>
        <div className="h-[3rem] w-full bg-white flex items-center px-2">
          <input
            type="text"
            className="rounded w-full px-2 border"
            placeholder="Message"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            type="submit"
            style={{
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
