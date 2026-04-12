"use client";

import { useState, useRef } from "react";
import { Question } from "@/lib/types";

interface Props {
  questions: Question[];
  setQuestions: (q: Question[]) => void;
  onStartQuiz: () => void;
}

const LABELS = ["A", "B", "C", "D"];

const EMPTY_FORM = {
  question: "",
  choices: ["", "", "", ""] as [string, string, string, string],
  answer: 0 as 0 | 1 | 2 | 3,
  explanation: "",
};

export default function QuestionManager({ questions, setQuestions, onStartQuiz }: Props) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function validate() {
    if (!form.question.trim()) return "Question text is required.";
    for (let i = 0; i < 4; i++) {
      if (!form.choices[i].trim()) return `Choice ${LABELS[i]} is required.`;
    }
    return "";
  }

  function saveQuestion() {
    const err = validate();
    if (err) { setFormError(err); return; }
    setFormError("");

    if (editingId) {
      setQuestions(questions.map((q) =>
        q.id === editingId ? { ...form, id: editingId } : q
      ));
      setEditingId(null);
    } else {
      setQuestions([...questions, { ...form, id: crypto.randomUUID() }]);
    }
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function startEdit(q: Question) {
    setForm({
      question: q.question,
      choices: [...q.choices] as [string, string, string, string],
      answer: q.answer,
      explanation: q.explanation ?? "",
    });
    setEditingId(q.id);
    setShowForm(true);
    setFormError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteQuestion(id: string) {
    setQuestions(questions.filter((q) => q.id !== id));
    if (editingId === id) { setEditingId(null); setForm(EMPTY_FORM); setShowForm(false); }
  }

  function cancelForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFormError("");
    setShowForm(false);
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(questions, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "lto-questions.json";
    a.click();
  }

  function importJSON(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (Array.isArray(parsed)) {
          // Ensure all have IDs
          const withIds = parsed.map((q: Question) => ({ ...q, id: q.id || crypto.randomUUID() }));
          setQuestions(withIds);
        }
      } catch { /* ignore */ }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="fade-up">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-sky-400 bg-sky-400/10 border border-sky-400/20 px-2.5 py-1 rounded-full">🇵🇭 LTO Philippines</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white mt-3 leading-tight">
          Driver's License<br />
          <span className="text-sky-400">Quiz Reviewer</span>
        </h1>
        <p className="text-slate-400 text-sm mt-2">Add your own questions, then take the quiz.</p>
      </div>

      {/* Stats + actions */}
      <div className="card p-4 mb-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-5">
          <div>
            <div className="text-2xl font-bold text-white">{questions.length}</div>
            <div className="text-xs text-slate-500">Questions</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <div className="text-2xl font-bold text-white">{Math.round(questions.length * 0.75)}</div>
            <div className="text-xs text-slate-500">Pass Score (75%)</div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={importJSON} />
          <button onClick={() => fileRef.current?.click()} className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
            ↑ Import JSON
          </button>
          <button onClick={exportJSON} disabled={questions.length === 0} className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors disabled:opacity-30">
            ↓ Export JSON
          </button>
        </div>
      </div>

      {/* Add / Edit form */}
      {!showForm ? (
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(EMPTY_FORM); }}
          className="w-full py-3 mb-5 rounded-xl border border-dashed border-sky-500/30 text-sky-400 hover:bg-sky-500/5 transition-colors text-sm font-semibold"
        >
          + Add Question
        </button>
      ) : (
        <div className="card p-5 mb-5 fade-in">
          <h2 className="text-sm font-bold text-white mb-4">
            {editingId ? "Edit Question" : "New Question"}
          </h2>

          {/* Question text */}
          <div className="mb-3">
            <label className="text-xs text-slate-500 mb-1.5 block">Question</label>
            <textarea
              className="inp resize-none"
              rows={3}
              placeholder="e.g. What does a solid yellow center line indicate?"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
            />
          </div>

          {/* Choices */}
          <div className="mb-3 space-y-2">
            <label className="text-xs text-slate-500 block">Answer Choices</label>
            {form.choices.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, answer: i as 0|1|2|3 })}
                  className={`w-7 h-7 flex-shrink-0 rounded-full text-xs font-bold transition-all border ${
                    form.answer === i
                      ? "bg-green-500/25 border-green-500/60 text-green-300"
                      : "bg-white/5 border-white/10 text-slate-500 hover:border-white/20"
                  }`}
                  title="Mark as correct answer"
                >
                  {LABELS[i]}
                </button>
                <input
                  className="inp"
                  placeholder={`Choice ${LABELS[i]}`}
                  value={c}
                  onChange={(e) => {
                    const updated = [...form.choices] as [string,string,string,string];
                    updated[i] = e.target.value;
                    setForm({ ...form, choices: updated });
                  }}
                />
              </div>
            ))}
            <p className="text-xs text-slate-600">Click a letter to mark the correct answer (currently: <span className="text-green-400">{LABELS[form.answer]}</span>)</p>
          </div>

          {/* Explanation */}
          <div className="mb-4">
            <label className="text-xs text-slate-500 mb-1.5 block">Explanation <span className="text-slate-600">(optional)</span></label>
            <textarea
              className="inp resize-none"
              rows={2}
              placeholder="Brief explanation shown after answering..."
              value={form.explanation}
              onChange={(e) => setForm({ ...form, explanation: e.target.value })}
            />
          </div>

          {formError && (
            <p className="text-xs text-red-400 mb-3">{formError}</p>
          )}

          <div className="flex gap-2">
            <button
              onClick={saveQuestion}
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              {editingId ? "Save Changes" : "Add Question"}
            </button>
            <button
              onClick={cancelForm}
              className="px-4 text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Question list */}
      {questions.length === 0 ? (
        <div className="text-center py-16 text-slate-600">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-sm">No questions yet. Add your first one above.</p>
        </div>
      ) : (
        <div className="space-y-2 mb-8">
          {questions.map((q, idx) => (
            <div key={q.id} className="card card-hover">
              <button
                className="w-full flex items-start gap-3 p-4 text-left"
                onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              >
                <span className="font-mono text-xs text-slate-600 mt-0.5 w-6 flex-shrink-0">{idx + 1}.</span>
                <span className="text-sm text-slate-200 flex-1 leading-snug">{q.question}</span>
                <span className="text-slate-600 text-xs ml-2 flex-shrink-0">{expandedId === q.id ? "▲" : "▼"}</span>
              </button>

              {expandedId === q.id && (
                <div className="px-4 pb-4 fade-in">
                  <div className="space-y-1.5 mb-3">
                    {q.choices.map((c, i) => (
                      <div key={i} className={`flex items-center gap-2.5 text-sm px-3 py-2 rounded-lg ${
                        i === q.answer
                          ? "bg-green-500/10 text-green-300 border border-green-500/20"
                          : "text-slate-400"
                      }`}>
                        <span className="font-mono text-xs w-4">{LABELS[i]}</span>
                        {c}
                        {i === q.answer && <span className="ml-auto text-xs">✓ correct</span>}
                      </div>
                    ))}
                  </div>
                  {q.explanation && (
                    <p className="text-xs text-slate-500 mb-3 italic">💡 {q.explanation}</p>
                  )}
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(q)} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">Edit</button>
                    <button onClick={() => deleteQuestion(q.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Start Quiz CTA */}
      {questions.length > 0 && (
        <div className="sticky bottom-6">
          <button
            onClick={onStartQuiz}
            className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 transition-all shadow-lg shadow-sky-500/20 text-base"
          >
            Start Quiz ({questions.length} questions) →
          </button>
        </div>
      )}
    </div>
  );
}
