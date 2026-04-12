# Quiz Reviewer

An exam reviewer created using NextJS, TypeScript, Tailwind CSS, primarily created for personal use only.


## Features
1. Randomized questions with randomized choices
2. Some questions include road sign images
3. Some questions have image answer choices
4. Explanations can be shown after each answer 
5. Wrong answers reviewed at the end

## Question Bank

Questions are manually hard-coded for now. Database implementation will be adapted on the later versions.

### Adding & Editing Questions

All questions live in **`lib/questions.ts`**. Three formats are supported:

---

#### Format 1 — Text only

```ts
{
  id: "q-unique-id",
  question: "What is the speed limit in a school zone?",
  choices: [
    { type: "text", value: "20 kph" },
    { type: "text", value: "30 kph" },   // ← correct (answer: 1)
    { type: "text", value: "40 kph" },
    { type: "text", value: "50 kph" },
  ],
  answer: 1,
  explanation: "Optional explanation shown after answering.",
},
```

---

#### Format 2 — Image on the question (text choices)

Add an `image` field pointing to a file inside `/public/images/`:

```ts
{
  id: "q-sign-01",
  question: "What does this sign mean?",
  image: "/images/stop-sign.svg",         // ← shown above the question
  choices: [
    { type: "text", value: "Yield" },
    { type: "text", value: "No Entry" },
    { type: "text", value: "Stop completely" },  // ← correct (answer: 2)
    { type: "text", value: "Speed limit" },
  ],
  answer: 2,
  explanation: "The red octagon is a STOP sign.",
},
```

---

#### Format 3 — Image choices

Use `{ type: "image", src: "...", alt: "..." }` for any choice.
If **all 4 choices are images**, they automatically render in a 2×2 grid.

```ts
{
  id: "q-markings-01",
  question: "Which marking means overtaking is NOT allowed?",
  choices: [
    { type: "image", src: "/images/solid-yellow-line.svg",  alt: "Solid yellow line" },   // ← correct
    { type: "image", src: "/images/broken-yellow-line.svg", alt: "Broken yellow line" },
    { type: "text",  value: "White edge line" },
    { type: "text",  value: "Blue lane marker" },
  ],
  answer: 0,
  explanation: "A solid yellow line means no overtaking.",
},
```

---

### Adding Images

1. Drop your image file into **`/public/images/`**
   - Supported: `.svg`, `.png`, `.jpg`, `.webp`
   - Recommended size: 200×200 px or similar square/landscape

2. Reference it as `"/images/your-file.png"` in the question

---

### Question Fields Reference

| Field         | Type                          | Required | Notes                          |
|---------------|-------------------------------|----------|--------------------------------|
| `id`          | `string`                      | ✅       | Must be unique                 |
| `question`    | `string`                      | ✅       | The question text              |
| `image`       | `string` (path)               | ❌       | Shown above the question       |
| `choices`     | `[Choice, Choice, Choice, Choice]` | ✅  | Exactly 4 choices              |
| `answer`      | `0 \| 1 \| 2 \| 3`           | ✅       | Index of the correct choice    |
| `explanation` | `string`                      | ❌       | Shown after answering          |

---

## Project Structure

```
app/
  page.tsx              Home screen + screen router
  layout.tsx
  globals.css
  globals.d.ts          Fixes CSS import TS error
components/
  QuizRunner.tsx        Active quiz UI
  QuizResults.tsx       Score, pass/fail, wrong-answer review
  ChoiceDisplay.tsx     Renders a single choice (text or image)
lib/
  types.ts              Shared TypeScript types
  questions.ts          ← Edit this to manage your questions
public/
  images/               ← Drop your images here
```

### TODO Features
- User has the option to review questions from different sources or combine them into a single questionnaire.
- User can manually add questions to the question bank.
- UI: Toggle between dark and light mode.