import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Planner() {
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("studyTasks")) || [];
    setTasks(savedTasks);
  }, []);

  function addTask() {
    if (topic.trim() === "" || date === "" || time === "") {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      topic,
      date,
      time,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    localStorage.setItem("studyTasks", JSON.stringify(updatedTasks));

    setTopic("");
    setDate("");
    setTime("");
  }

  function completeTask(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: true } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("studyTasks", JSON.stringify(updatedTasks));
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
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
            <button className="w-full text-left p-4 rounded-2xl bg-blue-600 text-white font-semibold">
              📅 Study Planner
            </button>
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-extrabold">Study Planner</h1>
            <p className="text-slate-500 mt-2">
              Plan your study schedule and track daily tasks.
            </p>
          </div>

          <div className="bg-green-100 text-green-700 px-6 py-3 rounded-full font-semibold">
            📅 Planning Mode
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-md">
            <h2 className="text-3xl font-bold mb-6">Add Study Task</h2>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Subject / Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-white border border-slate-300 p-4 rounded-2xl outline-none focus:border-blue-600"
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-slate-300 p-4 rounded-2xl outline-none focus:border-blue-600"
              />

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-white border border-slate-300 p-4 rounded-2xl outline-none focus:border-blue-600"
              />

              <button
                onClick={addTask}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl font-semibold shadow-md"
              >
                Add Task
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-md">
            <h2 className="text-3xl font-bold mb-6">Today’s Plan</h2>

            <div className="space-y-4">
              {tasks.length === 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center">
                  <p className="text-slate-500">No task added yet.</p>
                </div>
              )}

              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{task.topic}</h3>
                    <p className="text-slate-500 text-sm">Date: {task.date}</p>
                    <p className="text-slate-500 text-sm">Time: {task.time}</p>
                    <p
                      className={`text-sm mt-1 ${
                        task.completed ? "text-green-600" : "text-orange-500"
                      }`}
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </p>
                  </div>

                  {!task.completed && (
                    <button
                      onClick={() => completeTask(index)}
                      className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-xl font-semibold"
                    >
                      Complete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}