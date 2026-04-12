"use client";

import Image from "next/image";
import { Question } from "@/lib/types";

interface QuizRecord {
  question: Question;
  selectedIndex: number;
  correct: boolean;
}

interface Props {
  records: QuizRecord[];
  onRetake: () => void;
  onBack: () => void;
}

const LABELS = ["A", "B", "C", "D"];

export default function QuizResults({ records, onRetake, onBack }: Props) {
  const total = records.length;
  const score = records.filter((r) => r.correct).length;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 75;
  const wrong = records.filter((r) => !r.correct);

  const barColor = passed
    ? "linear-gradient(90deg,#22c55e,#4ade80)"
    : pct >= 50
    ? "linear-gradient(90deg,#f59e0b,#fcd34d)"
    : "linear-gradient(90deg,#ef4444,#f87171)";

  return (
    <div className="fade-up">
      {/* Hero */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">{passed ? "🎉" : pct >= 50 ? "📚" : "💪"}</div>
        <h1 className="text-3xl font-extrabold text-white mb-1">
          {passed ? "You Passed!" : "Keep Reviewing"}
        </h1>
        <p className="text-slate-400 text-sm">
          {passed ? "Great work — you're exam-ready!" : "Review the items below and try again."}
        </p>
      </div>

      {/* Score card */}
      <div className="card p-6 mb-6">
        <div className="text-center mb-5">
          <div className={`text-6xl font-extrabold ${passed ? "text-green-400" : pct >= 50 ? "text-yellow-400" : "text-red-400"}`}>
            {pct}%
          </div>
          <div className="text-slate-400 text-sm mt-1">{score} of {total} correct</div>
        </div>
        <div className="progress-track mb-5">
          <div className="progress-fill" style={{ width: `${pct}%`, background: barColor }} />
        </div>
        <div className="grid grid-cols-3 gap-4 text-center border-t border-white/5 pt-4">
          <div>
            <div className="text-xl font-bold text-green-400">{score}</div>
            <div className="text-xs text-slate-500">Correct</div>
          </div>
          <div>
            <div className="text-xl font-bold text-red-400">{total - score}</div>
            <div className="text-xs text-slate-500">Wrong</div>
          </div>
          <div>
            <div className={`text-xl font-bold ${passed ? "text-green-400" : "text-red-400"}`}>
              {passed ? "PASS" : "FAIL"}
            </div>
            <div className="text-xs text-slate-500">75% to pass</div>
          </div>
        </div>
      </div>

      {/* Wrong answers review */}
      {wrong.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">
            Needs Review ({wrong.length})
          </p>
          <div className="space-y-4">
            {wrong.map((r, i) => {
              const q = r.question;
              const allImages = q.choices.every((c) => c.type === "image");

              return (
                <div key={i} className="card p-4">
                  {/* Question image if any */}
                  {q.image && (
                    <div className="relative w-24 h-20 mb-3 rounded-lg overflow-hidden bg-white/5">
                      <Image src={q.image} alt="Question" fill className="object-contain p-1" />
                    </div>
                  )}

                  <p className="text-sm text-white font-medium mb-3 leading-snug">{q.question}</p>

                  {/* Choices */}
                  <div className={allImages ? "grid grid-cols-2 gap-2 mb-2" : "space-y-1.5 mb-2"}>
                    {q.choices.map((c, ci) => {
                      const isCorrect = ci === q.answer;
                      const isSelected = ci === r.selectedIndex;
                      const highlight = isCorrect
                        ? "border border-green-500/30 bg-green-500/8 text-green-300"
                        : isSelected
                        ? "border border-red-500/30 bg-red-500/8 text-red-300"
                        : "text-slate-600";

                      return (
                        <div key={ci} className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${highlight}`}>
                          <span className="font-mono w-4 flex-shrink-0">{LABELS[ci]}</span>
                          {c.type === "image" ? (
                            <div className="relative w-16 h-12 rounded overflow-hidden bg-white/5 flex-shrink-0">
                              <Image src={c.src} alt={c.alt} fill className="object-contain p-0.5" />
                            </div>
                          ) : (
                            <span>{c.value}</span>
                          )}
                          {isCorrect && <span className="ml-auto flex-shrink-0">✓</span>}
                          {isSelected && !isCorrect && <span className="ml-auto flex-shrink-0">your answer</span>}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <p className="text-xs text-slate-500 italic mt-2">💡 {q.explanation}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onRetake}
          className="flex-1 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 transition-all"
        >
          Retake Quiz
        </button>
        <button
          onClick={onBack}
          className="flex-1 py-3.5 rounded-xl font-semibold text-slate-300 card hover:bg-white/5 transition-all"
        >
          Home
        </button>
      </div>
    </div>
  );
}
