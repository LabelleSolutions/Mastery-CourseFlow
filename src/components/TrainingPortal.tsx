"use client";

import { useState } from 'react';
import { LESSONS } from '../data/lessons';
import { useTrainingSession } from '../hooks/useTrainingSession';
import ScoringSection from './ScoringSection';
import './TrainingPortal.css';

export default function TrainingPortal() {
  const [selectedLessonId, setSelectedLessonId] = useState(1);
  const session = useTrainingSession(selectedLessonId);

  const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLessonId(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    session.submitInput(session.userInput);
  };

  return (
    <div className="portal-container">
      <h2 className="portal-title">Student Training Portal</h2>

      {/* Lesson Selector */}
      <div className="lesson-selector">
        <label htmlFor="lesson-select" className="lesson-label">
          Lesson:
        </label>
        <select
          id="lesson-select"
          className="lesson-dropdown"
          value={selectedLessonId}
          onChange={handleLessonChange}
        >
          {LESSONS.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.name}
            </option>
          ))}
        </select>
        <span className="focus-badge">Focus: {session.currentFocus}</span>
      </div>

      {/* Training Sentence */}
      <div className="training-sentence-block">
        <p className="sentence-label">Practice this sentence:</p>
        <p className="training-sentence">{session.currentSentence}</p>
      </div>

      {/* Speech Input */}
      <form className="input-form" onSubmit={handleSubmit}>
        <textarea
          className="speech-input"
          rows={3}
          placeholder="Type your spoken response here…"
          value={session.userInput}
          onChange={(e) => session.setUserInput(e.target.value)}
          disabled={session.isLoading}
          aria-label="Speech input"
        />
        <button
          type="submit"
          className="btn-submit"
          disabled={session.isLoading || !session.userInput.trim()}
        >
          {session.isLoading ? 'Analyzing…' : 'Submit'}
        </button>
      </form>

      {/* Training Feedback */}
      {(session.aiFeedback || session.isLoading || session.aiError) && (
        <div className="feedback-block">
          <h3 className="feedback-title">Training Feedback</h3>
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

      {/* Scoring Section */}
      <ScoringSection
        studentScore={session.studentScore}
        aiScore={session.aiScore}
        coachScore={session.coachScore}
        totalScore={session.totalScore}
        aiFeedbackVisible={!!session.aiFeedback}
        aiSuggestion={session.aiSuggestion}
        onMarkRepetitionDone={session.markRepetitionDone}
        onCoachScoreChange={session.handleCoachScoreChange}
        showCoachControls={false}
      />
    </div>
  );
}
