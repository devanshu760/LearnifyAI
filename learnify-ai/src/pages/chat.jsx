import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [showPrompts, setShowPrompts] = useState(true);

const quickPrompts = [
  "📚 Summarize a topic",
  "🧠 Create a quick quiz",
  "📅 Help me plan my day",
];
  const [user, setUser] = useState(null);

  const [chat, setChat] = useState([
    {
      sender: "ai",
      text: "Hello 👋 I am your AI Learning Assistant. Ask me anything related to your studies.",
    },
  ]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedUser);

    if (loggedUser?.name) {
      setChat([
        {
          sender: "ai",
          text: `Hello ${loggedUser.name} 👋 I am your AI Learning Assistant. Ask me anything related to your studies.`,
        },
      ]);
    }
  }, []);

  function sendMessage(e) {
    e.preventDefault();

    if (message.trim() === "") return;

    const userText = message;

    setChat((oldChat) => [
      ...oldChat,
      { sender: "user", text: userText },
      {
        sender: "ai",
        text: `You asked: "${userText}". This is a demo AI response. In the final project, this section can be connected with an AI API for real answers.`,
      },
    ]);
setShowPrompts(false);
    setMessage("");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-slate-200 p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-blue-600 mb-12">
          🎓 Learnify AI
        </h1>

        <div className="space-y-3">
          <Link to="/dashboard">
            <button className="w-full text-left p-4 rounded-2xl hover:bg-blue-50">
              🏠 Dashboard
            </button>
          </Link>

          <Link to="/chat">
            <button className="w-full text-left p-4 rounded-2xl bg-blue-600 text-white font-semibold">
              💬 AI Chat
            </button>
          </Link>

          <Link to="/quiz">
            <button className="w-full text-left p-4 rounded-2xl hover:bg-blue-50">
              🧠 Quiz Generator
            </button>
          </Link>

          <Link to="/notes">
            <button className="w-full text-left p-4 rounded-2xl hover:bg-blue-50">
              📄 Notes
            </button>
          </Link>

          <Link to="/planner">
            <button className="w-full text-left p-4 rounded-2xl hover:bg-blue-50">
              📅 Study Planner
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <div className="bg-white border-b border-slate-200 px-10 py-7 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold">
              AI Learning Assistant
            </h1>

            <p className="text-slate-500 mt-2">
             Smart Conversations for Smarter Learning
            </p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-semibold">
            ✨ AI Mode Active
          </div>
        </div>

        <div className="flex-1 p-10 overflow-y-auto space-y-6">
            {showPrompts && (
  <div className="grid md:grid-cols-3 gap-4 mb-6">
    {quickPrompts.map((prompt) => (
      <button
        key={prompt}
        onClick={() => setMessage(prompt)}
        className="bg-white border border-slate-200 p-5 rounded-3xl text-left shadow-sm hover:shadow-md hover:border-blue-300 transition"
      >
        <p className="font-semibold text-slate-900">
          {prompt}
        </p>

        <p className="text-sm text-slate-500 mt-2">
          Click to start with this prompt.
        </p>
      </button>
    ))}
  </div>
)}
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-5 rounded-3xl max-w-[720px] leading-7 shadow-sm ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-slate-200 text-slate-700"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={sendMessage}
          className="bg-white border-t border-slate-200 p-6"
        >
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Ask anything related to your studies..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-white border border-slate-300 p-4 rounded-2xl outline-none focus:border-blue-600"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 rounded-2xl font-semibold shadow-md"
            >
              Send
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}