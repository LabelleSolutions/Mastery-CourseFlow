import { useState } from 'react'
import TrainingPortal from './components/TrainingPortal'
import CoachPortal from './components/CoachPortal'
import './App.css'

type View = 'home' | 'student' | 'coach'

function App() {
  const [view, setView] = useState<View>('home')

  return (
    <div id="app-root">
      <header className="app-header">
        <div className="header-inner">
          <div className="brand" onClick={() => setView('home')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setView('home')}>
            <span className="brand-title">Mastery</span>
            <span className="brand-sub">TRAIN YOUR VOICE. CONTROL YOUR SPEECH.</span>
          </div>
          <nav className="header-nav">
            <button
              className={`nav-btn${view === 'student' ? ' active' : ''}`}
              onClick={() => setView('student')}
            >
              Student Training
            </button>
            <button
              className={`nav-btn${view === 'coach' ? ' active' : ''}`}
              onClick={() => setView('coach')}
            >
              Coach Portal
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {view === 'home' && (
          <section className="home-section">
            <h1 className="home-title">Mastery CourseFlow</h1>
            <p className="home-tagline">TRAIN YOUR VOICE. CONTROL YOUR SPEECH.</p>
            <p className="home-desc">
              A speech performance training platform. Select your role to get started.
            </p>
            <div className="home-actions">
              <button className="btn-primary" onClick={() => setView('student')}>
                Student Training
              </button>
              <button className="btn-secondary" onClick={() => setView('coach')}>
                Coach Portal
              </button>
            </div>
          </section>
        )}
        {view === 'student' && <TrainingPortal />}
        {view === 'coach' && <CoachPortal />}
      </main>
    </div>
  )
}

export default App
