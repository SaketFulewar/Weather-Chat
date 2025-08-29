import { useState } from "react";
import { useParams } from "react-router";
import ChatBubble from "./ChatBubble";

export default function ChatBox() {
  let id = useParams();
  id = id.chatId;
  function getChatData() {
    alert(id);
  }
  async function handleApiCall() {
    const url =
      "https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream";

    const headers = {
      Accept: "*/*",
      "Accept-Language": "en-GB,en-US;q=0.99,en;q=0.88,fr;q=0.77",
      Connection: "keep-alive",
      "Content-Type": "application/json",
      "x-mastra-dev-playground": "true",
    };

    const payload = {
      messages: [
        {
          role: "user",
          content: "What's the weather like today in Mumbai?",
        },
      ],
      runId: "weatherAgent",
      maxRetries: 2,
      maxSteps: 5,
      temperature: 0.5,
      topP: 1,
      runtimeContext: {},
      threadId: "YOUR_COLLEGE_ROLL_NUMBER", // Replace with your actual roll number
      resourceId: "weatherAgent",
    };

    // let data = await fetch(url, {
    //   method: "POST",
    //   headers: headers,
    //   body: JSON.stringify(payload),
    // });

    // data = await data.json();
    alert();
    getChatData();
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
          <ChatBubble message="Hello!" isUser={true} />

        </div>
        <div className="h-[3rem] w-full bg-white flex items-center px-2">
          <input
            type="text"
            className="rounded w-full px-2 border"
            placeholder="Message"
          />
          <button
            type="submit"
            style={{
              cursor: "pointer",
            }}
            onClick={handleApiCall}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
