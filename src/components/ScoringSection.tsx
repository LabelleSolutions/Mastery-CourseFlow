import type { AISuggestion } from '../types';
import './ScoringSection.css';

interface Props {
  studentScore: number;
  aiScore: number;
  coachScore: number;
  totalScore: number;
  aiFeedbackVisible: boolean;
  aiSuggestion: AISuggestion | null;
  onMarkRepetitionDone: () => void;
  onCoachScoreChange: (value: number) => void;
  showCoachControls?: boolean;
}

export default function ScoringSection({
  studentScore,
  aiScore,
  coachScore,
  totalScore,
  aiFeedbackVisible,
  aiSuggestion,
  onMarkRepetitionDone,
  onCoachScoreChange,
  showCoachControls = false,
}: Props) {
  return (
    <div className="scoring-section">
      {aiSuggestion && showCoachControls && (
        <div className="ai-suggestion-panel">
          <h3>AI Suggestion</h3>
          <ul>
            <li>
              <span className="label">Ending sound:</span>{' '}
              {aiSuggestion.endingSound}
            </li>
            <li>
              <span className="label">Projection:</span>{' '}
              {aiSuggestion.projection}
            </li>
            <li>
              <span className="label">Repetitions:</span>{' '}
              {aiSuggestion.repetitions}
            </li>
            <li>
              <span className="label">Suggested Score:</span>{' '}
              <strong>
                {aiSuggestion.suggestedScore} / 25
              </strong>
            </li>
          </ul>
        </div>
      )}

      <div className="scores-grid">
        <div className="score-item">
          <span className="score-label">Student Score</span>
          <span className="score-value">
            {studentScore} <span className="score-max">/ 25</span>
          </span>
        </div>
        <div className="score-item">
          <span className="score-label">AI Score</span>
          <span className="score-value">
            {aiScore} <span className="score-max">/ 15</span>
          </span>
        </div>
        <div className="score-item">
          <span className="score-label">Coach Score</span>
          {showCoachControls ? (
            <input
              className="coach-score-input"
              type="number"
              min={0}
              max={25}
              value={coachScore}
              onChange={(e) => onCoachScoreChange(Number(e.target.value))}
              aria-label="Coach score (0–25)"
            />
          ) : (
            <span className="score-value">
              {coachScore} <span className="score-max">/ 25</span>
            </span>
          )}
        </div>
        <div className="score-item total">
          <span className="score-label">Total Score</span>
          <span className="score-value">
            {totalScore} <span className="score-max">/ 65</span>
          </span>
        </div>
      </div>

      <p className="repetition-guidance">
        Repeat 3–10 times before marking complete
      </p>

      <button
        className="btn-repetition"
        onClick={onMarkRepetitionDone}
        disabled={!aiFeedbackVisible}
        title={
          !aiFeedbackVisible
            ? 'Submit your speech first to enable this button'
            : undefined
        }
      >
        Mark Repetition Done
      </button>
    </div>
  );
}
