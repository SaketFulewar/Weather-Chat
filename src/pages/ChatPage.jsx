import SideBar from "../components/SideBar";
import ChatBox from "../components/ChatBox";
function ChatPage() {
  return (
    <>
      <div className="flex">
        <SideBar />
        <ChatBox />
      </div>
    </>
  );
}

export default ChatPage;
