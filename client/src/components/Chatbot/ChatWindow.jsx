import React from "react";
import { useState, useRef, useEffect } from "react";
import { getBotReply } from "./getBotReply";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [lastTopic, setLastTopic] = useState(null);

  const bottomRef = useRef(null);

  const sendMessage = () => {
  if (!input.trim()) return;

  const userMsg = input;

  setMessages(prev => [...prev, { from: "user", text: userMsg }]);
  setInput("");

  setTimeout(() => {
    const bot = getBotReply(userMsg, lastTopic);

    setMessages(prev => [
      ...prev,
      { from: "bot", text: bot.reply }
    ]);

    setLastTopic(bot.topic);
  }, 600); // thinking delay 😌
};

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>🤖 AI Assistant</span>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>
            {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything…"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default ChatWindow;
