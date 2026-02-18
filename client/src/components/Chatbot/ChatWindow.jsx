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

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMsg = input;

  setMessages(prev => [...prev, { from: "user", text: userMsg }]);
  setInput("");

  try {
    const res = await fetch("http://localhost:3000/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMsg }),
    });

    const bot = await res.json();

    setMessages(prev => [...prev, { from: "bot", text: bot.reply }]);
    setLastTopic(bot.topic);

  } catch (err) {
    setMessages(prev => [
      ...prev,
      { from: "bot", text: "⚠️ Server error. Please try again later." },
    ]);
  }
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
          <div
  className={`msg ${m.from}`}
  dangerouslySetInnerHTML={{
    __html: m.text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank">$1</a>'
    )
  }}
/>

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
