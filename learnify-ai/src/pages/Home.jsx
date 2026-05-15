import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("How can I help you today?");

  function handleAsk() {
    if (!question.trim()) return;

    setReply(
      `Demo AI Response: You asked "${question}". I can help you understand this topic step by step.`
    );

    setQuestion("");
  }

  const features = [
    ["💬", "AI Chat Assistant", "Get instant study help and clear your doubts anytime."],
    ["📄", "Smart Notes", "Upload, organize, and access your notes easily."],
    ["🧠", "Quiz Generator", "Generate practice quizzes based on any topic."],
    ["📅", "Study Planner", "Plan your schedule and track daily progress."],
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200 px-10 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🎓</div>
          <div>
            <h1 className="text-2xl font-bold">Learnify AI</h1>
            <p className="text-xs text-slate-500">Smart Learning Assistant</p>
          </div>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#home" className="text-blue-600">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About Us</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 border border-blue-600 text-blue-600 rounded-xl"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 bg-blue-600 text-white rounded-xl"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="px-10 md:px-20 py-20 grid md:grid-cols-2 gap-12 items-center"
      >
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
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg"
            >
              Get Started →
            </button>

            <a
              href="#features"
              className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold"
            >
              Explore Features
            </a>
          </div>

          <p className="mt-8 text-sm text-slate-500">
            👨‍🎓👩‍🎓 Join 500+ students already learning smarter
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="bg-blue-50 rounded-[30px] p-8 shadow-xl border border-blue-100">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="font-bold text-xl">Welcome back, Student 👋</h2>
                <p className="text-slate-500 text-sm">
                  Let’s make today productive!
                </p>
              </div>
              <div>🔔 👤</div>
            </div>

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
              <p className="text-slate-600 mb-5">{reply}</p>

              <div className="flex gap-3">
                <input
                  placeholder="Ask anything related to your studies..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAsk();
                  }}
                  className="flex-1 border border-slate-200 rounded-xl px-4 py-3"
                />

                <button
                  onClick={handleAsk}
                  className="bg-blue-600 text-white px-4 rounded-xl"
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="px-10 md:px-20 py-20 border-t border-slate-100"
      >
        <p className="text-center text-blue-600 text-sm font-bold mb-3">
          WHAT YOU CAN DO
        </p>

        <h2 className="text-center text-4xl font-bold mb-4">
          Everything You Need for Your Studies
        </h2>

        <p className="text-center text-slate-500 mb-14">
          Powerful tools that make learning simple, effective, and organized.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature[1]}
              className="bg-white border border-slate-200 rounded-3xl p-8 shadow-md hover:shadow-xl transition"
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl mb-6">
                {feature[0]}
              </div>

              <h3 className="text-xl font-bold mb-3">{feature[1]}</h3>
              <p className="text-slate-600 leading-7 mb-6">{feature[2]}</p>
              <button
  onClick={() => alert("Login required. Please login to access this feature.")}
  className="text-blue-600 font-semibold"
>
  Learn more →
</button>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="px-10 md:px-20 py-20 grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="rounded-3xl overflow-hidden shadow-lg bg-slate-100 h-[360px] flex items-center justify-center text-8xl">
          💻📚
        </div>

        <div>
          <p className="text-blue-600 text-sm font-bold mb-3">ABOUT US</p>
          <h2 className="text-4xl font-bold mb-6">
            Why We Built Learnify AI
          </h2>

          <p className="text-slate-600 leading-8 mb-6">
            We built Learnify AI to solve everyday learning challenges faced by
            students. Our goal is to combine AI with education and make learning
            more personalized, organized, and effective.
          </p>

          <div className="space-y-3">
            <p>✅ Designed for students by students</p>
            <p>✅ AI powered tools to save your time</p>
            <p>✅ All in one platform for learning and growth</p>
            <p>✅ Secure, simple and student friendly</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-10 md:mx-20 my-10 bg-blue-50 rounded-3xl p-8 grid md:grid-cols-4 gap-6 text-center">
        {[
          ["500+", "Active Students"],
          ["1000+", "Notes Uploaded"],
          ["2000+", "Quizzes Generated"],
          ["3000+", "Tasks Completed"],
        ].map((stat) => (
          <div key={stat[0]}>
            <h3 className="text-4xl font-bold text-blue-600">{stat[0]}</h3>
            <p className="text-slate-600">{stat[1]}</p>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="px-10 md:px-20 py-20">
        <p className="text-center text-blue-600 text-sm font-bold mb-3">
          WHAT STUDENTS SAY
        </p>

        <h2 className="text-center text-4xl font-bold mb-12">
          Loved by Learners
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            [
              "Riya Sharma",
              "Learnify AI has changed the way I study. The AI assistant is super helpful.",
            ],
            [
              "Aman Verma",
              "The quiz generator helps me practice more and score better in exams.",
            ],
            [
              "Neha Singh",
              "Finally, a platform that keeps my notes, tasks and doubts in one place.",
            ],
          ].map((t) => (
            <div
              key={t[0]}
              className="border border-slate-200 rounded-3xl p-8 shadow-md"
            >
              <p className="text-slate-600 leading-7 mb-6">“{t[1]}”</p>
              <h4 className="font-bold">{t[0]}</h4>
              <p className="text-sm text-slate-500">BCA Student</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="px-10 md:px-20 py-20 grid md:grid-cols-2 gap-10"
      >
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          {[
            "What is Learnify AI?",
            "Is Learnify AI free to use?",
            "Can I access my data from anywhere?",
            "How does the AI assistant work?",
          ].map((q) => (
            <div
              key={q}
              className="border border-slate-200 rounded-xl p-4 mb-3 flex justify-between"
            >
              <span>{q}</span>
              <span>⌄</span>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-3xl p-10 flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-4">
              Start Your Learning Journey Today
            </h3>

            <p className="text-slate-600 mb-6">
              Join students already learning smarter with Learnify AI.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold"
            >
              Get Started Now →
            </button>
          </div>

          <div className="text-8xl hidden md:block">🎓</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-10 md:px-20 py-10 border-t border-slate-200">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold">🎓 Learnify AI</h3>
            <p className="text-slate-500 mt-3">
              AI powered platform to make learning smarter and easier.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-3">Quick Links</h4>
            <p>Home</p>
            <p>Features</p>
            <p>About Us</p>
          </div>

          <div>
            <h4 className="font-bold mb-3">Resources</h4>
            <p>Help Center</p>
            <p>Privacy Policy</p>
            <p>FAQs</p>
          </div>

          <div>
            <h4 className="font-bold mb-3">Contact Us</h4>
            <p>Email: support@learnifyai.com</p>
            <p>Location: India</p>
          </div>
        </div>

        <p className="text-center text-slate-500 mt-10">
          © 2025 Learnify AI. Developed by Devanshu Gupta & Arpit Sahu.
        </p>
      </footer>
    </div>
  );
}