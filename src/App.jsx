import { BrowserRouter, Routes, Route } from "react-router";
import ChatPage from "./pages/ChatPage";
import { LocalChatStoreProvider } from "./context/DataStoreContext";

function App() {
  return (
    <LocalChatStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/chat/:chatId?" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </LocalChatStoreProvider>
  );
}

export default App;