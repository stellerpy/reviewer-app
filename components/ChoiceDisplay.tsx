import Image from "next/image";
import { Choice } from "@/lib/types";

interface Props {
  choice: Choice;
  label: string; // "A" "B" "C"
  state: "idle" | "correct" | "wrong" | "dimmed";
  onClick: () => void;
  disabled: boolean;
  isImageGrid: boolean; // true when all 4 choices are images → 2×2 grid layout
}

const LABEL_COLORS = {
  idle:    "bg-white/7 text-slate-400",
  correct: "bg-green-500/30 text-green-200",
  wrong:   "bg-red-500/30 text-red-200",
  dimmed:  "bg-white/5 text-slate-600",
};

const CHOICE_COLORS = {
  idle:    "",
  correct: "correct",
  wrong:   "wrong",
  dimmed:  "dimmed",
};

export default function ChoiceDisplay({ choice, label, state, onClick, disabled, isImageGrid }: Props) {
  const isImg = choice.type === "image";
  const extraClass = isImg && isImageGrid ? "choice-img" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`choice ${extraClass} ${CHOICE_COLORS[state]}`}
    >
      {/* Label badge */}
      <span className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${LABEL_COLORS[state]}`}>
        {state === "correct" ? "✓" : state === "wrong" ? "✗" : label}
      </span>

      {/* Content */}
      {isImg ? (
        <div className="flex flex-col items-center gap-1">
          <div className="relative w-28 h-24 rounded-lg overflow-hidden bg-white/5">
            <Image
              src={(choice as Extract<typeof choice, { type: "image" }>).src}
              alt={(choice as Extract<typeof choice, { type: "image" }>).alt}
              fill
              className="object-contain p-1"
            />
          </div>
          <span className="text-xs text-slate-500">
            {(choice as Extract<typeof choice, { type: "image" }>).alt}
          </span>
        </div>
      ) : (
        <span className={`text-sm leading-relaxed ${
          state === "correct" ? "text-green-200"
          : state === "wrong"   ? "text-red-300"
          : state === "dimmed"  ? "text-slate-600"
          : "text-slate-200"
        }`}>
          {(choice as Extract<typeof choice, { type: "text" }>).value}
        </span>
      )}
    </button>
  );
}
