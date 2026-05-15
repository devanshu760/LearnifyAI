import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/chat";
import Quiz from "./pages/quiz";
import Notes from "./pages/notes";
import Planner from "./pages/planner";
export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/chat" element={<Chat />} />

        <Route path="/quiz" element={<Quiz />} />

        <Route path="/notes" element={<Notes />} />

        <Route path="/planner" element={<Planner />} />

      </Routes>

    </BrowserRouter>
  );
}