import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [notesCount, setNotesCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [studyHours, setStudyHours] = useState(0);

  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  const growthData = [
  { day: "Mon", hours: 1, quizzes: 1 },
  { day: "Tue", hours: 2, quizzes: 2 },
  { day: "Wed", hours: 3, quizzes: 1 },
  { day: "Thu", hours: 2, quizzes: 3 },
  { day: "Fri", hours: 5, quizzes: 2 },
  { day: "Sat", hours: 4, quizzes: 4 },
  { day: "Sun", hours: 6, quizzes: 5 },
];

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedUser) {
      navigate("/login");
      return;
    }

    setUser(loggedUser);
    setReply(
      `Hello ${loggedUser.name} 👋 How can I help you with your studies today?`
    );

    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

    setNotesCount(notes.length);
    setQuizCount(quizzes.length);
    setTaskCount(tasks.length);

    const completedTasks = tasks.filter((task) => task.completed).length;
    setStudyHours(completedTasks * 2);
  }, [navigate]);

  function logout() {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  }

  function askAI() {
    if (!question.trim()) return;

    setReply(
      `Demo AI Response: You asked "${question}". I can help you understand this topic step by step.`
    );

    setQuestion("");
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
            <button className="w-full text-left p-4 rounded-2xl bg-blue-600 text-white font-semibold">
              🏠 Dashboard
            </button>
          </Link>

          <Link to="/chat">
            <button className="w-full text-left p-4 rounded-2xl hover:bg-blue-50">
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

          <button
            onClick={logout}
            className="w-full text-left p-4 rounded-2xl bg-red-50 text-red-600 font-semibold hover:bg-red-100"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-extrabold">
              Student Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Welcome back, {user?.name || "Student"} 👋
            </p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-semibold">
            ✨ AI Learning Mode Active
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-4">
              📄
            </div>

            <h2 className="text-slate-600 font-semibold mb-2">
              Uploaded Notes
            </h2>

            <p className="text-5xl font-bold text-blue-600">
              {notesCount}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl mb-4">
              🧠
            </div>

            <h2 className="text-slate-600 font-semibold mb-2">
              Quizzes Completed
            </h2>

            <p className="text-5xl font-bold text-purple-600">
              {quizCount}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-4">
              📅
            </div>

            <h2 className="text-slate-600 font-semibold mb-2">
              Study Tasks
            </h2>

            <p className="text-5xl font-bold text-green-600">
              {taskCount}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl mb-4">
              ⏱️
            </div>

            <h2 className="text-slate-600 font-semibold mb-2">
              Study Hours
            </h2>

            <p className="text-5xl font-bold text-emerald-600">
              {studyHours}h
            </p>
          </div>
        </div>

        {/* AI Assistant */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-md">
          <h2 className="text-3xl font-bold mb-5">
            AI Learning Assistant
          </h2>

          <div className="bg-blue-50 rounded-2xl p-5 mb-5">
            <p className="text-slate-700">
              {reply}
            </p>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Ask your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") askAI();
              }}
              className="flex-1 bg-white border border-slate-300 p-4 rounded-2xl outline-none focus:border-blue-600"
            />

            <button
              onClick={askAI}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 rounded-2xl font-semibold"
            >
              Send
            </button>
          </div>
        </div>
        {/* Middle Section */}
<div className="grid lg:grid-cols-3 gap-6 mt-10 mb-10">

  {/* Daily Tasks */}
  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md">
    <h2 className="text-2xl font-bold mb-5">
      📅 Daily Checklist
    </h2>

    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked readOnly />
        <p>Complete React Quiz</p>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" />
        <p>Upload DBMS Notes</p>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" />
        <p>Revise JavaScript</p>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" checked readOnly />
        <p>Study 2 Hours</p>
      </div>
    </div>
  </div>

  {/* Recent Activity */}
  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md">
    <h2 className="text-2xl font-bold mb-5">
      ⚡ Recent Activity
    </h2>

    <div className="space-y-4 text-slate-600">
      <p>📄 Uploaded React Notes</p>
      <p>🧠 Completed JavaScript Quiz</p>
      <p>📅 Added Study Planner Task</p>
      <p>💬 Asked AI about DBMS</p>
    </div>
  </div>

  {/* Productivity */}
  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-3xl p-6 shadow-md">
    <h2 className="text-2xl font-bold mb-5">
      🚀 Productivity
    </h2>

    <h3 className="text-5xl font-extrabold mb-3">
      87%
    </h3>

    <p className="text-blue-100 leading-7">
      Your learning consistency is improving this week.
    </p>
  </div>
</div>

{/* Growth Charts */}
<div className="grid lg:grid-cols-2 gap-6 mt-6">

  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md">
    <h2 className="text-2xl font-bold mb-6">
      📈 Study Hours Growth
    </h2>

    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={growthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="hours"
            stroke="#2563eb"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md">
    <h2 className="text-2xl font-bold mb-6">
      🧠 Quiz Performance
    </h2>

    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={growthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="quizzes"
            fill="#7c3aed"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>
      </main>
    </div>
  );
}