import { useState, useEffect, useCallback } from 'react';
import type { StudentSession, AISuggestion } from '../types';
import { LESSON_MAP } from '../data/lessons';

const AI_SCORE_FIXED = 12;
const STUDENT_SCORE_INCREMENT = 5;
const STUDENT_SCORE_MAX = 25;
const COACH_SCORE_MAX = 25;
const LOCAL_STORAGE_KEY = 'mastery_latest_session';

function buildAIPrompt(
  userInput: string,
  currentFocus: string,
): string {
  return `You are a speech performance coach.

You train spoken English as a motor skill.

STRICT RULES:
- Only ONE correction
- Do NOT explain
- Do NOT teach grammar
- Use short commands only
- Always require repetition

Focus: ${currentFocus}

Student input: "${userInput}"

OUTPUT FORMAT (MANDATORY):

Issue:
Correction:
Repeat:`;
}

async function callAI(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;

  if (!apiKey) {
    // Demo fallback: return a structured mock response
    await new Promise((r) => setTimeout(r, 800));
    return `Issue: Ending sound was dropped on the last word.\nCorrection: Say the final consonant — "speeK" not "spee".\nRepeat: Say it again — SPEAK.`;
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 120,
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    throw new Error(`AI request failed: ${res.statusText}`);
  }

  const data = await res.json() as {
    choices: Array<{ message: { content: string } }>;
  };
  return data.choices[0]?.message?.content ?? '';
}

function buildAISuggestion(
  repetitionCount: number,
  studentScore: number,
): AISuggestion {
  const improvement =
    repetitionCount >= 3 ? 'improved' : 'needs more repetitions';
  const projectionNote =
    studentScore >= 20 ? 'strong' : 'slightly low';
  return {
    endingSound: improvement,
    projection: projectionNote,
    repetitions: `${Math.max(repetitionCount, 1)} → ${Math.max(1, repetitionCount - 2)}`,
    suggestedScore: Math.min(
      STUDENT_SCORE_MAX,
      Math.round(studentScore * 0.9),
    ),
  };
}

export function useTrainingSession(lessonId: number) {
  const { focus: currentFocus, sentence: currentSentence } =
    LESSON_MAP[lessonId];

  const [userInput, setUserInput] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const [studentScore, setStudentScore] = useState(0);
  const [coachScore, setCoachScore] = useState(0);
  const [repetitionCount, setRepetitionCount] = useState(0);

  const aiScore = AI_SCORE_FIXED;
  const totalScore = studentScore + aiScore + coachScore;

  // Reset student score when new input is submitted
  const submitInput = useCallback(
    async (input: string) => {
      if (!input.trim()) return;
      setStudentScore(0);
      setRepetitionCount(0);
      setAiFeedback('');
      setAiError('');
      setIsLoading(true);

      try {
        const prompt = buildAIPrompt(input, currentFocus);
        const feedback = await callAI(prompt);
        setAiFeedback(feedback);
      } catch (err) {
        setAiError(
          err instanceof Error ? err.message : 'AI request failed.',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [currentFocus],
  );

  // Mark repetition done: +5 to student score, max 25
  const markRepetitionDone = useCallback(() => {
    setStudentScore((prev) =>
      Math.min(prev + STUDENT_SCORE_INCREMENT, STUDENT_SCORE_MAX),
    );
    setRepetitionCount((prev) => prev + 1);
  }, []);

  const handleCoachScoreChange = useCallback((value: number) => {
    const clamped = Math.max(0, Math.min(COACH_SCORE_MAX, value));
    setCoachScore(clamped);
  }, []);

  const aiSuggestion: AISuggestion | null = aiFeedback
    ? buildAISuggestion(repetitionCount, studentScore)
    : null;

  // Persist latest session to localStorage
  useEffect(() => {
    if (!aiFeedback) return;
    const session: StudentSession = {
      studentId: 'current',
      studentName: 'Student',
      lessonId,
      userInput,
      aiFeedback,
      scores: { studentScore, aiScore, coachScore, totalScore },
      aiSuggestion,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(session));
  }, [
    aiFeedback,
    studentScore,
    aiScore,
    coachScore,
    totalScore,
    lessonId,
    userInput,
    aiSuggestion,
  ]);

  return {
    currentFocus,
    currentSentence,
    userInput,
    setUserInput,
    aiFeedback,
    isLoading,
    aiError,
    studentScore,
    aiScore,
    coachScore,
    totalScore,
    repetitionCount,
    aiSuggestion,
    submitInput,
    markRepetitionDone,
    handleCoachScoreChange,
  };
}
