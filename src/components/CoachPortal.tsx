"use client";

import { useState } from 'react';
import { LESSONS } from '../data/lessons';
import { useTrainingSession } from '../hooks/useTrainingSession';
import ScoringSection from './ScoringSection';
import type { StudentSession } from '../types';
import './CoachPortal.css';

const DEMO_STUDENTS = [
  { id: 's1', name: 'Alex Rivera' },
  { id: 's2', name: 'Jordan Lee' },
  { id: 's3', name: 'Morgan Chen' },
];

function StudentRow({
  studentId,
  studentName,
}: {
  studentId: string;
  studentName: string;
}) {
  const [selectedLessonId, setSelectedLessonId] = useState(1);
  const session = useTrainingSession(selectedLessonId);
  const [isExpanded, setIsExpanded] = useState(false);

  // Load last session from localStorage for this student
  const [lastSession, setLastSession] = useState<StudentSession | null>(() => {
    const raw = localStorage.getItem(`mastery_session_${studentId}`);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as StudentSession;
    } catch {
      return null;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await session.submitInput(session.userInput);
  };

  const handleSaveScore = () => {
    const saved: StudentSession = {
      studentId,
      studentName,
      lessonId: selectedLessonId,
      userInput: session.userInput,
      aiFeedback: session.aiFeedback,
      scores: {
        studentScore: session.studentScore,
        aiScore: session.aiScore,
        coachScore: session.coachScore,
        totalScore: session.totalScore,
      },
      aiSuggestion: session.aiSuggestion,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(
      `mastery_session_${studentId}`,
      JSON.stringify(saved),
    );
    setLastSession(saved);
    alert(`Score saved for ${studentName}: ${session.totalScore} / 65`);
  };

  return (
    <div className="student-card">
      <div
        className="student-card-header"
        onClick={() => setIsExpanded((v) => !v)}
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsExpanded((v) => !v)}
      >
        <div className="student-info">
          <span className="student-name">{studentName}</span>
          <span className="student-badge">Elite</span>
        </div>
        <div className="student-summary">
          {lastSession ? (
            <span className="last-score">
              Last: {lastSession.scores.totalScore} / 65
            </span>
          ) : (
            <span className="no-session">No session yet</span>
          )}
          <span className="expand-icon">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="student-card-body">
          {/* Lesson Selector */}
          <div className="lesson-selector">
            <label htmlFor={`lesson-${studentId}`} className="lesson-label">
              Lesson:
            </label>
            <select
              id={`lesson-${studentId}`}
              className="lesson-dropdown"
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(Number(e.target.value))}
            >
              {LESSONS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
            <span className="focus-badge">Focus: {session.currentFocus}</span>
          </div>

          {/* Training Sentence */}
          <div className="training-sentence-block">
            <p className="sentence-label">Practice sentence:</p>
            <p className="training-sentence">{session.currentSentence}</p>
          </div>

          {/* Student Input (coach can type on behalf of student or review) */}
          <form className="input-form" onSubmit={handleSubmit}>
            <textarea
              className="speech-input"
              rows={2}
              placeholder="Enter student's spoken response…"
              value={session.userInput}
              onChange={(e) => session.setUserInput(e.target.value)}
              disabled={session.isLoading}
            />
            <button
              type="submit"
              className="btn-submit"
              disabled={session.isLoading || !session.userInput.trim()}
            >
              {session.isLoading ? 'Analyzing…' : 'Analyze'}
            </button>
          </form>

          {/* Training Feedback */}
          {(session.aiFeedback || session.isLoading || session.aiError) && (
            <div className="feedback-block">
              <h4 className="feedback-title">Training Feedback</h4>
              {session.isLoading && (
                <p className="feedback-loading">Generating feedback…</p>
              )}
              {session.aiError && (
                <p className="feedback-error">{session.aiError}</p>
              )}
              {session.aiFeedback && (
                <pre className="feedback-text">{session.aiFeedback}</pre>
              )}
            </div>
          )}

          {/* Scoring (coach controls) */}
          <ScoringSection
            studentScore={session.studentScore}
            aiScore={session.aiScore}
            coachScore={session.coachScore}
            totalScore={session.totalScore}
            aiFeedbackVisible={!!session.aiFeedback}
            aiSuggestion={session.aiSuggestion}
            onMarkRepetitionDone={session.markRepetitionDone}
            onCoachScoreChange={session.handleCoachScoreChange}
            showCoachControls={true}
          />

          {/* Save Score */}
          {session.aiFeedback && (
            <button className="btn-save" onClick={handleSaveScore}>
              Save Score for {studentName}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function CoachPortal() {
  return (
    <div className="portal-container">
      <h2 className="portal-title">Coach Portal</h2>
      <p className="portal-subtitle">
        Review Elite students, apply AI feedback, and assign final scores.
        Coach score always overrides AI.
      </p>

      <div className="students-list">
        {DEMO_STUDENTS.map((s) => (
          <StudentRow key={s.id} studentId={s.id} studentName={s.name} />
        ))}
      </div>
    </div>
  );
}
