export default function Message({ role, content }) {
  return (
    <div className={`message ${role}`}>
      <div className="bubble">
        {role === "assistant" && <span className="avatar">🧠</span>}
        <p>{content}</p>
        {role === "user" && <span className="avatar">👤</span>}
      </div>
    </div>
  );
}