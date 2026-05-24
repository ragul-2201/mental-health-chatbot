import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Message from "./Message";
import Resources from "./Resources";

const API_URL = import.meta.env.VITE_API_URL || "https://mental-health-backend2.onrender.com";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I'm MindEase 💙 I'm here to listen. How are you feeling today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [stressLevel, setStressLevel] = useState("low");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/chat`, {
        message: input,
        history: messages
      });

      setStressLevel(res.data.stressLevel);
      setMessages([
        ...updatedHistory,
        { role: "assistant", content: res.data.reply }
      ]);
    } catch (err) {
      setMessages([
        ...updatedHistory,
        { role: "assistant", content: "I'm sorry, something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-wrapper">
      {stressLevel === "high" && <Resources />}

      <div className="chat-box">
        {messages.map((msg, i) => (
          <Message key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="message assistant">
            <span className="typing">MindEase is typing...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Share what's on your mind..."
          rows={2}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>

      <div className={`stress-indicator stress-${stressLevel}`}>
        Mood detected: <strong>{stressLevel.toUpperCase()}</strong>
      </div>
    </div>
  );
}