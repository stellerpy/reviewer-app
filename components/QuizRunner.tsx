"use client";

import { useState } from "react";
import Image from "next/image";
import { Question } from "@/lib/types";
import ChoiceDisplay from "./ChoiceDisplay";

interface QuizRecord {
  question: Question;
  selectedIndex: number;
  correct: boolean;
}

interface Props {
  questions: Question[];
  onFinish: (records: QuizRecord[]) => void;
  onBack: () => void;
}

const LABELS = ["A", "B", "C", "D"] as const;

export default function QuizRunner({ questions, onFinish, onBack }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [records, setRecords] = useState<QuizRecord[]>([]);
  const [animKey, setAnimKey] = useState(0);

  const q = questions[index];
  const progress = (index / questions.length) * 100;
  const score = records.filter((r) => r.correct).length;

  // Detect if all 4 choices are images → render in 2×2 grid
  const allChoicesImages = q.choices.every((c) => c.type === "image");

  function handleSelect(i: number) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
  }

  function handleNext() {
    if (selected === null) return;
    const record: QuizRecord = {
      question: q,
      selectedIndex: selected,
      correct: selected === q.answer,
    };
    const newRecords = [...records, record];

    if (index + 1 >= questions.length) {
      onFinish(newRecords);
    } else {
      setRecords(newRecords);
      setIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
      setAnimKey((k) => k + 1);
    }
  }

  function getChoiceState(i: number): "idle" | "correct" | "wrong" | "dimmed" {
    if (!answered) return "idle";
    if (i === q.answer) return "correct";
    if (i === selected) return "wrong";
    return "dimmed";
  }

  return (
    <div className="fade-up">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="text-slate-500 hover:text-white text-sm transition-colors">
          ← Exit
        </button>
        <span className="font-mono text-xs text-slate-500">{index + 1} / {questions.length}</span>
        <div className="font-mono text-xs px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
          {score} pts
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-track mb-7">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question card */}
      <div key={animKey} className="fade-up">
        <div className="card p-5 mb-4">
          <p className="font-mono text-xs text-slate-600 mb-3">Q{index + 1}</p>

          {/* Optional question image */}
          {q.image && (
            <div className="relative w-full max-w-[220px] mx-auto aspect-square mb-4 rounded-xl overflow-hidden bg-white/5">
              <Image
                src={q.image}
                alt="Question image"
                fill
                className="object-contain p-3"
              />
            </div>
          )}

          <p className="text-lg font-semibold text-white leading-relaxed">{q.question}</p>
        </div>

        {/* Choices — grid if all images, stack otherwise */}
        <div className={allChoicesImages ? "grid grid-cols-2 gap-3 mb-4" : "space-y-2.5 mb-4"}>
          {q.choices.map((choice, i) => (
            <ChoiceDisplay
              key={i}
              choice={choice}
              label={LABELS[i]}
              state={getChoiceState(i)}
              onClick={() => handleSelect(i)}
              disabled={answered}
              isImageGrid={allChoicesImages}
            />
          ))}
        </div>

        {/* Post-answer: explanation + next button */}
        {answered && (
          <div className="fade-in space-y-3">
            {q.explanation && (
              <div className="card p-4" style={{ borderColor: "rgba(56,189,248,0.15)", background: "rgba(56,189,248,0.05)" }}>
                <p className="text-xs text-sky-400 font-mono mb-1.5">💡 Explanation</p>
                <p className="text-sm text-slate-300 leading-relaxed">{q.explanation}</p>
              </div>
            )}
            <button
              onClick={handleNext}
              className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 transition-all"
            >
              {index + 1 >= questions.length ? "See Results →" : "Next →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
