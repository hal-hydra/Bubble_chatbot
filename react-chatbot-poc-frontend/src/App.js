import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [msgs, setMsgs] = useState([{ from: "bot", text: "Hi! How can I help?" }]);
  const [inpt, setInpt] = useState("");

  const send = async () => {
    if (!inpt) return;
    setMsgs([...msgs, { from: "user", text: inpt }]);
    const { data } = await axios.post("http://127.0.0.1:8000/chat", { message: inpt });
    setMsgs(m => [...m, { from: "bot", text: data.reply }]);
    setInpt("");
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {msgs.map((m, i) => <div key={i} className={m.from}>{m.text}</div>)}
      </div>
      <div className="input-area">
        <input value={inpt} onChange={e => setInpt(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}