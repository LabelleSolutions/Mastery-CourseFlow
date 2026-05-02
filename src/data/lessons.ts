import type { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  {
    id: 1,
    name: 'Lesson 1 – Breath Control',
    focus: 'Breath Control',
    sentence: 'Take a slow, steady breath before you begin to speak.',
  },
  {
    id: 2,
    name: 'Lesson 2 – Sound Awareness',
    focus: 'Sound Awareness',
    sentence: 'Listen carefully to every sound you produce out loud.',
  },
  {
    id: 3,
    name: 'Lesson 3 – Ending Sounds',
    focus: 'Ending Sounds',
    sentence: 'Make sure you pronounce the last word completely and clearly.',
  },
  {
    id: 4,
    name: 'Lesson 4 – Clarity',
    focus: 'Clarity',
    sentence: 'Speak each word with clean and precise articulation.',
  },
  {
    id: 5,
    name: 'Lesson 5 – Projection',
    focus: 'Projection',
    sentence: 'Send your voice to the back of the room without shouting.',
  },
  {
    id: 6,
    name: 'Lesson 6 – Resonance',
    focus: 'Resonance',
    sentence: 'Feel the vibration in your chest as you speak with depth.',
  },
  {
    id: 7,
    name: 'Lesson 7 – Tone Control',
    focus: 'Tone Control',
    sentence: 'Use a warm and controlled tone to convey your message.',
  },
  {
    id: 8,
    name: 'Lesson 8 – Rhythm',
    focus: 'Rhythm',
    sentence: 'Keep a steady rhythm and avoid rushing your speech.',
  },
  {
    id: 9,
    name: 'Lesson 9 – Prominence',
    focus: 'Prominence',
    sentence: 'Stress the most important word to make your point clear.',
  },
  {
    id: 10,
    name: 'Lesson 10 – Variation',
    focus: 'Variation',
    sentence: 'Vary your pitch and pace to keep your listener engaged.',
  },
];

export const LESSON_MAP: Record<number, { focus: string; sentence: string }> =
  Object.fromEntries(
    LESSONS.map((l) => [l.id, { focus: l.focus, sentence: l.sentence }]),
  );
