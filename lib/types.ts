/**
 * A single answer choice.
 * Either a text string OR an image (with optional alt text).
 */
export type Choice =
  | { type: "text"; value: string }
  | { type: "image"; src: string; alt: string };

/**
 * A quiz question.
 *
 * - `image`   — optional image shown above the question text
 * - `choices` — exactly 4 choices; each can be text OR image
 * - `answer`  — 0-based index of the correct choice
 */
export interface Question {
  id: string;
  question: string;
  image?: string;           // path relative to /public, e.g. "/images/stop-sign.svg"
  choices: [Choice, Choice, Choice];
  answer: 0 | 1 | 2;
  explanation?: string;
}
