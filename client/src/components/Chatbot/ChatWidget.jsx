import React from "react";
import { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./Chatbot.css";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatWindow onClose={() => setOpen(false)} />}

      <div className="chat-wrapper">
        <span className="chat-tooltip">Ask AI</span>

        <button
          className={`chat-fab ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          🤖
        </button>
      </div>
    </>
  );
};

export default ChatWidget;
