import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Notes() {
  const [fileName, setFileName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setUploadedFiles(savedNotes);
  }, []);

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
    }
  }

  function uploadFile() {
    if (fileName === "") {
      alert("Please choose a file first");
      return;
    }

    const newFile = {
      name: fileName,
      date: new Date().toLocaleDateString(),
    };

    const updatedFiles = [...uploadedFiles, newFile];

    setUploadedFiles(updatedFiles);
    localStorage.setItem("notes", JSON.stringify(updatedFiles));

    alert("File uploaded successfully");
    setFileName("");
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
            <button className="w-full text-left p-4 rounded-2xl bg-blue-600 text-white font-semibold">
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
            <h1 className="text-5xl font-extrabold">Notes Management</h1>
            <p className="text-slate-500 mt-2">
              Upload and manage your study materials easily.
            </p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-semibold">
            📄 Smart Notes
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-md max-w-5xl">
          <div className="border-2 border-dashed border-blue-200 bg-blue-50 rounded-3xl p-16 text-center">
            <div className="text-6xl mb-4">📄</div>

            <h2 className="text-3xl font-bold mb-4">
              Upload Notes / PDFs
            </h2>

            <p className="text-slate-500 mb-6">
              Choose a file from your computer and save it in your notes list.
            </p>

            <input
              type="file"
              onChange={handleFileChange}
              className="mb-6 bg-white border border-slate-300 p-3 rounded-xl"
            />

            <br />

            <button
              onClick={uploadFile}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-md"
            >
              Upload File
            </button>

            {fileName && (
              <p className="mt-4 text-green-600 font-semibold">
                Selected File: {fileName}
              </p>
            )}
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">
              Uploaded Notes
            </h2>

            <div className="space-y-4">
              {uploadedFiles.length === 0 ? (
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center">
                  <p className="text-slate-500">
                    No notes uploaded yet.
                  </p>
                </div>
              ) : (
                uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold">
                        {file.name}
                      </h3>

                      <p className="text-slate-500 text-sm">
                        Uploaded on {file.date}
                      </p>
                    </div>

                    <button className="bg-blue-600 text-white px-5 py-2 rounded-xl">
                      View
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}