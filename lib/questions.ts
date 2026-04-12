import { Question } from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────
 *  HOW TO ADD / EDIT QUESTIONS
 * ─────────────────────────────────────────────────────
 *
 * Three question formats are supported:
 *
 * 1. TEXT ONLY
 *    No `image` field. All choices are { type:"text", value:"..." }.
 *
 * 2. IMAGE ON QUESTION (text choices)
 *    Add `image: "/images/my-sign.svg"` to show a picture above
 *    the question. Choices remain text.
 *
 * 3. IMAGE CHOICES
 *    Each choice is { type:"image", src:"/images/x.svg", alt:"..." }.
 *    You can mix text and image choices in the same question.
 *
 * `answer` is always the 0-based index of the correct choice (0=A, 1=B, 2=C, 3=D).
 *
 * Place all image files in /public/images/ and reference them as "/images/filename.ext".
 * ─────────────────────────────────────────────────────
 */

export const questions: Question[] = [

  // ── 1. TEXT ONLY ────────────────────────────────────
  {
    id: "q1",
    question: "Under RA 4136, what is the speed limit inside a school zone unless otherwise posted?",
    choices: [
      { type: "text", value: "20 kph" },
      { type: "text", value: "30 kph" },
      { type: "text", value: "40 kph" },
    ],
    answer: 1,
    explanation: "The speed limit in school zones is 30 kph under RA 4136. Violators may be fined especially during school hours.",
  },

  {
    id: "q2",
    question: "When two vehicles arrive at an uncontrolled intersection at the same time, which has the right of way?",
    choices: [
      { type: "text", value: "The vehicle on the left" },
      { type: "text", value: "The vehicle on the right" },
      { type: "text", value: "The vehicle traveling at higher speed" },
    ],
    answer: 1,
    explanation: "At uncontrolled intersections, yield to the vehicle on your RIGHT. This is the standard right-of-way rule under RA 4136.",
  },

  {
    id: "q3",
    question: "Under the Anti-Drunk and Drugged Driving Act (RA 10586), what is the BAC limit for non-professional drivers?",
    choices: [
      { type: "text", value: "0.01%" },
      { type: "text", value: "0.05%" },
      { type: "text", value: "0.08%" },
    ],
    answer: 1,
    explanation: "RA 10586 sets the BAC limit at 0.05% for non-professional drivers. Professional drivers have a stricter limit of 0.01%.",
  },

  {
    id: "q4",
    question: "The Seat Belt Law (RA 8750) requires seatbelts to be worn by:",
    choices: [
      { type: "text", value: "Driver only" },
      { type: "text", value: "Driver and front-seat passengers" },
      { type: "text", value: "All passengers in the vehicle" },
    ],
    answer: 1,
    explanation: "RA 8750 mandates the driver and all front-seat passengers to wear seatbelts at all times while the vehicle is in motion.",
  },

  {
    id: "q5",
    question: "Under the Anti-Distracted Driving Act (RA 10913), which of the following is ALLOWED while driving?",
    choices: [
      { type: "text", value: "Texting on a handheld phone" },
      { type: "text", value: "Using a hands-free Bluetooth headset" },
      { type: "text", value: "Holding your phone to check navigation" },
    ],
    answer: 1,
    explanation: "RA 10913 bans the use of handheld devices while driving. Hands-free devices (earpiece, Bluetooth, mounted GPS) are permitted.",
  },

  // ── 2. IMAGE ON QUESTION (text choices) ─────────────
  {
    id: "q6",
    question: "What does this road sign mean?",
    image: "/images/no-entry-sign.svg",
    choices: [
      { type: "text", value: "Slow down and proceed with caution" },
      { type: "text", value: "No entry — do not enter" },
      { type: "text", value: "Stop completely and wait" },
    ],
    answer: 1,
    explanation: "The red circle with a white horizontal bar is the universal 'No Entry' sign. Vehicles must not enter the road or lane.",
  },

  {
    id: "q7",
    question: "What does this road sign mean?",
    image: "/images/stop-sign.svg",
    choices: [
      { type: "text", value: "Yield to traffic from the right" },
      { type: "text", value: "Slow down and proceed if clear" },
      { type: "text", value: "Come to a complete stop before proceeding" },
    ],
    answer: 2,
    explanation: "The STOP sign requires all drivers to make a complete stop at the designated line before checking and proceeding.",
  },

  {
    id: "q8",
    question: "What does this road sign mean?",
    image: "/images/warning-sign.svg",
    choices: [
      { type: "text", value: "Mandatory speed increase" },
      { type: "text", value: "Informational guide sign" },
      { type: "text", value: "Warning — hazard or change in road condition ahead" },
    ],
    answer: 2,
    explanation: "Triangular yellow/amber signs with an exclamation mark are warning signs. They alert drivers to upcoming hazards.",
  },

  {
    id: "q9",
    question: "What does this road sign mean?",
    image: "/images/yield-sign.svg",
    choices: [
      { type: "text", value: "Stop completely and do not proceed" },
      { type: "text", value: "Slow down and give way to traffic that has right of way" },
      { type: "text", value: "Proceed at normal speed" },
    ],
    answer: 1,
    explanation: "A YIELD sign means reduce speed and give right of way to other vehicles and pedestrians. You need not stop if the way is clear.",
  },

  // ── 3. IMAGE CHOICES ─────────────────────────────────
  {
    id: "q10",
    question: "Which road marking means overtaking is NOT allowed?",
    choices: [
      {
        type: "image",
        src: "/images/solid-yellow-line.svg",
        alt: "Solid yellow center line",
      },
      {
        type: "image",
        src: "/images/broken-yellow-line.svg",
        alt: "Broken/dashed yellow center line",
      },
      { type: "text", value: "White edge line" },
    ],
    answer: 0,
    explanation: "A solid yellow center line means no overtaking in either direction. A broken/dashed yellow line means overtaking is allowed when safe.",
  },

  {
    id: "q11",
    question: "Which of the following signs means you must come to a complete stop?",
    choices: [
      {
        type: "image",
        src: "/images/warning-sign.svg",
        alt: "Warning sign (triangle with !)",
      },
      {
        type: "image",
        src: "/images/yield-sign.svg",
        alt: "Yield sign (inverted triangle)",
      },
      {
        type: "image",
        src: "/images/stop-sign.svg",
        alt: "Stop sign (red octagon)",
      },
    ],
    answer: 2,
    explanation: "Only the red octagonal STOP sign requires a complete stop. Yield requires slowing down; No Entry means do not enter; Warning advises caution.",
  },

  
];
