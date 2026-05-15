import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister() {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const user = { name, email, password };
    localStorage.setItem("registeredUser", JSON.stringify(user));

    alert("Account created successfully");
    navigate("/login");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Blurred Home Background */}
      <div className="absolute inset-0 scale-105 blur-sm opacity-50 pointer-events-none">
        <nav className="bg-white border-b border-slate-200 px-10 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎓</div>
            <div>
              <h1 className="text-2xl font-bold">Learnify AI</h1>
              <p className="text-xs text-slate-500">Smart Learning Assistant</p>
            </div>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium">
            <span className="text-blue-600">Home</span>
            <span>Features</span>
            <span>About Us</span>
            <span>FAQ</span>
          </div>

          <div className="flex gap-3">
            <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-xl">
              Login
            </button>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-xl">
              Register
            </button>
          </div>
        </nav>

        <section className="px-10 md:px-20 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              ✦ AI Powered Learning Platform
            </span>

            <h1 className="text-6xl font-extrabold leading-tight mt-8 mb-6">
              Learn Smarter, <br />
              <span className="text-blue-600">Achieve Better</span>
            </h1>

            <p className="text-slate-600 text-lg leading-8 mb-8">
              Learnify AI is your all-in-one academic companion designed to help
              you learn, practice, organize notes, and plan better with the power
              of artificial intelligence.
            </p>

            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg">
                Get Started →
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold">
                Explore Features
              </button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-[30px] p-8 shadow-xl border border-blue-100">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h2 className="font-bold text-xl mb-2">
                Welcome back, Student 👋
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                Let’s make today productive!
              </p>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  ["Notes", "24"],
                  ["Quizzes", "18"],
                  ["Tasks", "12"],
                  ["Streak", "7"],
                ].map((item) => (
                  <div
                    key={item[0]}
                    className="border border-slate-200 rounded-2xl p-4"
                  >
                    <p className="text-slate-500 text-sm">{item[0]}</p>
                    <h3 className="text-3xl font-bold">{item[1]}</h3>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-2xl p-5">
                <h3 className="font-bold mb-2">AI Assistant</h3>
                <p className="text-slate-600 mb-5">
                  How can I help you today?
                </p>
                <div className="flex gap-3">
                  <div className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-slate-400">
                    Ask anything related to your studies...
                  </div>
                  <div className="bg-blue-600 text-white px-4 rounded-xl flex items-center">
                    ➤
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-white/55 backdrop-blur-[3px]" />

      {/* Register Modal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-[460px] bg-white/95 border border-slate-200 rounded-[28px] shadow-2xl p-10">
          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
            🎓
          </div>

          <h1 className="text-4xl font-extrabold text-center mb-2 text-slate-900">
            Register
          </h1>

          <p className="text-center text-slate-500 mb-8">
            Create your smart learning account
          </p>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white border border-slate-300 outline-none focus:border-blue-600"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white border border-slate-300 outline-none focus:border-blue-600"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRegister();
              }}
              className="w-full p-4 rounded-2xl bg-white border border-slate-300 outline-none focus:border-blue-600"
            />

            <button
              onClick={handleRegister}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl font-semibold shadow-lg"
            >
              Create Account
            </button>

            <p className="text-center text-slate-500">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 cursor-pointer hover:underline font-medium"
              >
                Login here
              </span>
            </p>

            <p
              onClick={() => navigate("/")}
              className="text-center text-sm text-slate-400 cursor-pointer hover:text-blue-600"
            >
              ← Back to Home
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}