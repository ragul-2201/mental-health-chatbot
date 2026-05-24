import { useState } from "react";
import Chat from "./components/Chat";
import "./index.css";

export default function App() {
  return (
    <div className="app-container">
      <header>
        <h1>🧠 MindEase</h1>
        <p>A safe space to talk. Always here for you.</p>
      </header>
      <Chat />
      <footer>
        <p>⚠️ This is not a replacement for professional help.</p>
        <p>Crisis Line: <strong>988</strong> | Text HOME to <strong>741741</strong></p>
      </footer>
    </div>
  );
}