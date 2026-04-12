"use client";

import { useState } from "react";
import { questions } from "@/lib/questions";
import { Question } from "@/lib/types";
import QuizRunner from "@/components/QuizRunner";
import QuizResults from "@/components/QuizResults";

type Screen = "home" | "quiz" | "results";

interface QuizRecord {
  question: Question;
  selectedIndex: number;
  correct: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [shuffled, setShuffled] = useState<Question[]>([]);
  const [records, setRecords] = useState<QuizRecord[]>([]);

  function startQuiz() {
    setShuffled(shuffle(questions));
    setRecords([]);
    setScreen("quiz");
  }

  return (
    <div className="min-h-screen px-4 py-10 max-w-2xl mx-auto">
      {screen === "home" && (
        <div className="fade-up">
          {/* Header */}
          <div className="mb-10">
            <span className="text-xs font-mono text-sky-400 bg-sky-400/10 border border-sky-400/20 px-3 py-1 rounded-full">
              🇵🇭 LTO Philippines
            </span>
            <h1 className="text-4xl font-extrabold text-white mt-4 leading-tight">
              Driver&apos;s License<br />
              <span className="text-sky-400">Quiz Reviewer</span>
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              {questions.length} questions · Traffic signs, road rules, laws & more
            </p>
          </div>

          {/* Stats */}
          <div className="card p-5 mb-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{questions.length}</div>
              <div className="text-xs text-slate-500 mt-0.5">Questions</div>
            </div>
            <div className="border-x border-white/5">
              <div className="text-2xl font-bold text-white">75%</div>
              <div className="text-xs text-slate-500 mt-0.5">Passing Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">🔀</div>
              <div className="text-xs text-slate-500 mt-0.5">Shuffled</div>
            </div>
          </div>

          {/* What to expect */}
          <div className="space-y-2 mb-10">
            {[
              { icon: "🖼️", label: "Some questions include road sign images" },
              { icon: "🔤", label: "Some questions have image answer choices" },
              { icon: "💡", label: "Explanations shown after each answer" },
              { icon: "📋", label: "Wrong answers reviewed at the end" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-sm text-slate-400">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={startQuiz}
            className="w-full py-4 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 transition-all shadow-lg shadow-sky-500/20"
          >
            Start Quiz →
          </button>
        </div>
      )}

      {screen === "quiz" && (
        <QuizRunner
          questions={shuffled}
          onFinish={(r) => { setRecords(r); setScreen("results"); }}
          onBack={() => setScreen("home")}
        />
      )}

      {screen === "results" && (
        <QuizResults
          records={records}
          onRetake={startQuiz}
          onBack={() => setScreen("home")}
        />
      )}
    </div>
  );
}
