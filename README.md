# Mastery CourseFlow

**TRAIN YOUR VOICE. CONTROL YOUR SPEECH.** — Speech performance training platform.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Features

### Student Training Portal
- **Lesson Selector** – choose from 10 lessons (Breath Control → Variation), each mapped to a training focus
- **Training Sentence** – a practice sentence matched to the selected lesson
- **Speech Input** – type your spoken response and receive AI coaching feedback
- **Training Feedback** – strict Mastery-method AI response: *Issue / Correction / Repeat*
- **Scoring Section**
  - Student Score: 0–25 (click "Mark Repetition Done" to add +5 per repetition)
  - AI Score: 12/15 (fixed)
  - Coach Score: 0–25 (editable)
  - Total Score: auto-calculated /65
- **Session persistence** – latest session (input + scores) saved in `localStorage`

### Coach Portal
- Expandable student cards for all Elite students
- Per-student lesson selector and training sentence
- AI suggestions panel (ending sound, projection, repetitions, suggested score)
- Editable coach score – **coach always overrides AI**
- Save session scores to `localStorage` per student

### AI Behavior
- One correction at a time
- Uses CAPITAL letters to stress key words
- Priority: Ending Sounds → Projection → Tone Variation → Breath Control
- Output format: `Issue:` / `Correction:` / `Repeat:`
- Prompt dynamically injects `currentFocus` from the selected lesson

---

## Firebase Integration

This project uses Firebase (Auth, Firestore, Storage). See **[docs/firebase.md](docs/firebase.md)** for full setup instructions including:

- Creating a Firebase project and web app
- Enabling Google and Email/Password authentication
- Creating Firestore and Storage instances
- Setting environment variables

### Quick start

```bash
cp .env.example .env.local
# Fill in your Firebase project values in .env.local
# Optionally add NEXT_PUBLIC_OPENAI_API_KEY for live AI feedback
```

---

## Setup

```bash
npm install
npm run dev
```

---

## Scoring Structure

| Score         | Max    | Notes                                |
|---------------|--------|--------------------------------------|
| Student Score | 25     | +5 per "Mark Repetition Done" click  |
| AI Score      | 15     | Fixed at 12                          |
| Coach Score   | 25     | Manual input; overrides AI           |
| **Total**     | **65** | Auto-calculated                      |

---

## Lessons

| # | Name                       | Focus           |
|---|----------------------------|-----------------|
| 1 | Lesson 1 – Breath Control  | Breath Control  |
| 2 | Lesson 2 – Sound Awareness | Sound Awareness |
| 3 | Lesson 3 – Ending Sounds   | Ending Sounds   |
| 4 | Lesson 4 – Clarity         | Clarity         |
| 5 | Lesson 5 – Projection      | Projection      |
| 6 | Lesson 6 – Resonance       | Resonance       |
| 7 | Lesson 7 – Tone Control    | Tone Control    |
| 8 | Lesson 8 – Rhythm          | Rhythm          |
| 9 | Lesson 9 – Prominence      | Prominence      |
| 10| Lesson 10 – Variation      | Variation       |
