import { BrowserRouter, Routes, Route } from "react-router";
import ChatPage from "./pages/ChatPage";
import { LocalChatStoreProvider } from "./context/DataStoreContext";
function App() {
  return (
    <LocalChatStoreProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={}></Route> */}
          <Route path="/chat/:chatId" element={<ChatPage />}></Route>
        </Routes>
      </BrowserRouter>
    </LocalChatStoreProvider>
  );
}

export default App;
