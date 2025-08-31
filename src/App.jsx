import { BrowserRouter, Routes, Route } from "react-router";
import ChatPage from "./pages/ChatPage";
import { LocalChatStoreProvider } from "./context/DataStoreContextProvider";

function App() {
  return (
    <LocalChatStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatPage/>}></Route>
          <Route path="/chat/:chatId" element={<ChatPage />} />
          <Route path="/chat/" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </LocalChatStoreProvider>
  );
}

export default App;