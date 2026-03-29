export interface Lesson {
  id: number;
  name: string;
  focus: string;
  sentence: string;
}

export interface SessionScore {
  studentScore: number;
  aiScore: number;
  coachScore: number;
  totalScore: number;
}

export interface AISuggestion {
  endingSound: string;
  projection: string;
  repetitions: string;
  suggestedScore: number;
}

export interface StudentSession {
  studentId: string;
  studentName: string;
  lessonId: number;
  userInput: string;
  aiFeedback: string;
  scores: SessionScore;
  aiSuggestion: AISuggestion | null;
  timestamp: string;
}
