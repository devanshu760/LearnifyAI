import { useState } from "react";
import { Link } from "react-router-dom";

export default function Quiz() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [report, setReport] = useState(null);

  function generateQuiz() {
    if (topic.trim() === "") {
      alert("Please enter a topic first");
      return;
    }

    const generatedQuestions = [
      {
        question: `What is ${topic}?`,
        options: [
          "A concept, subject, or technology used for learning",
          "Only a database",
          "Only an operating system",
          "Only a hardware device",
        ],
        correct: 0,
      },
      {
        question: `Why is ${topic} important for students?`,
        options: [
          "It improves knowledge and practical skills",
          "It is only used for gaming",
          "It is used only for typing",
          "It has no educational use",
        ],
        correct: 0,
      },
      {
        question: `Which ability can improve by learning ${topic}?`,
        options: [
          "Problem solving",
          "Driving skills",
          "Cooking skills",
          "Painting walls",
        ],
        correct: 0,
      },
      {
        question: `How can students practice ${topic} effectively?`,
        options: [
          "By reading, revising, and solving questions regularly",
          "By ignoring examples",
          "By avoiding practice",
          "By memorizing without understanding",
        ],
        correct: 0,
      },
      {
        question: `Which method is best for understanding ${topic}?`,
        options: [
          "Learning concepts with examples and practice",
          "Skipping the basics",
          "Only watching unrelated videos",
          "Not revising at all",
        ],
        correct: 0,
      },
    ];

    setQuestions(generatedQuestions);
    setSelectedAnswers({});
    setReport(null);
    setTopic("");
  }

  function selectOption(questionIndex, optionIndex) {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
  }

  function submitQuiz() {
    if (questions.length === 0) return;

    if (Object.keys(selectedAnswers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    let score = 0;

    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        score++;
      }
    });

    const quizReport = {
      id: Date.now(),
      topic: questions[0].question.split("What is ")[1]?.replace("?", "") || "Quiz",
      totalQuestions: questions.length,
      score,
      percentage: Math.round((score / questions.length) * 100),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    setReport(quizReport);

    const oldQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    localStorage.setItem("quizzes", JSON.stringify([...oldQuizzes, quizReport]));

    alert("Quiz submitted successfully. Report saved to dashboard.");
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
            <button className="w-full text-left p-4 rounded-2xl bg-blue-600 text-white font-semibold">
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

      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-extrabold">Quiz Generator</h1>
            <p className="text-slate-500 mt-2">
              Generate smart MCQ quizzes and save reports to dashboard.
            </p>
          </div>

          <div className="bg-purple-100 text-purple-700 px-6 py-3 rounded-full font-semibold">
            🧠 Practice Mode
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-md max-w-6xl">
          <h2 className="text-2xl font-bold mb-5">Create a New Quiz</h2>

          <div className="flex gap-4 mb-8">
            <input
              type="text"
              placeholder="Enter topic, e.g. React.js, DBMS, JavaScript"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") generateQuiz();
              }}
              className="flex-1 bg-white border border-slate-300 p-4 rounded-2xl outline-none focus:border-blue-600"
            />

            <button
              onClick={generateQuiz}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-md"
            >
              Generate Quiz
            </button>
          </div>

          {questions.length === 0 ? (
            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 text-center">
              <div className="text-6xl mb-4">🧠</div>
              <h3 className="text-2xl font-bold mb-2">No Quiz Generated Yet</h3>
              <p className="text-slate-500">
                Enter a topic and click Generate Quiz to create 5 MCQ questions.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {questions.map((q, qIndex) => (
                <div
                  key={qIndex}
                  className="bg-slate-50 border border-slate-200 p-6 rounded-3xl"
                >
                  <h2 className="font-bold text-lg mb-4">
                    Q{qIndex + 1}. {q.question}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-3">
                    {q.options.map((option, optionIndex) => {
                      const isSelected = selectedAnswers[qIndex] === optionIndex;

                      return (
                        <button
                          key={optionIndex}
                          onClick={() => selectOption(qIndex, optionIndex)}
                          className={`text-left border rounded-2xl p-4 transition ${
                            isSelected
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white border-slate-200 hover:border-blue-300"
                          }`}
                        >
                          <span className="font-semibold">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>{" "}
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <button
                onClick={submitQuiz}
                className="w-full bg-green-600 hover:bg-green-500 text-white p-4 rounded-2xl font-semibold shadow-md"
              >
                Submit Quiz & Save Report
              </button>

              {report && (
                <div className="bg-green-50 border border-green-200 rounded-3xl p-8">
                  <h2 className="text-3xl font-bold text-green-700 mb-4">
                    Quiz Report
                  </h2>

                  <p className="text-slate-700">
                    Topic: <b>{report.topic}</b>
                  </p>
                  <p className="text-slate-700">
                    Score: <b>{report.score}/{report.totalQuestions}</b>
                  </p>
                  <p className="text-slate-700">
                    Percentage: <b>{report.percentage}%</b>
                  </p>
                  <p className="text-slate-700">
                    Date: <b>{report.date}</b>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}