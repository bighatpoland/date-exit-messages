import React, { useEffect, useState } from 'react'
import Home from './components/Home'
import Session from './components/Session'
import MessageReceived from './components/MessageReceived'
import History from './components/History'
import Landing from './components/Landing'
import { DateSession, GeneratedMessage } from './types'

function loadHistory(): GeneratedMessage[] {
  try {
    const raw = localStorage.getItem('history')
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (Array.isArray(parsed)) return parsed as GeneratedMessage[]
    return []
  } catch (e) { return [] }
}

function saveHistory(h: GeneratedMessage[]) {
  try { localStorage.setItem('history', JSON.stringify(h)) } catch (e) {}
}

export default function App() {
  // Updated navigation: side menu for mobile, top buttons for desktop
  const [screen, setScreen] = useState<'landing'|'home'|'session'|'message'|'history'>('landing')
  const [session, setSession] = useState<DateSession | null>(null)
  const [lastMessage, setLastMessage] = useState<GeneratedMessage | null>(null)
  const [history, setHistory] = useState<GeneratedMessage[]>(() => loadHistory())
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // restore last session if any
    try {
      const raw = localStorage.getItem('activeSession')
      if (raw) {
        const s = JSON.parse(raw) as DateSession
        // if scheduled and time passed, we'll set to session and let Session component trigger it
        setSession(s)
        setScreen('session')
      }
    } catch (e) {}
  }, [])

  useEffect(() => { saveHistory(history) }, [history])

  function startSession(s: DateSession) {
    setSession(s)
    setScreen('session')
    try { localStorage.setItem('activeSession', JSON.stringify(s)) } catch (e) {}
  }

  function handlePanic(msg: GeneratedMessage) {
    setLastMessage(msg)
    setScreen('message')
  setHistory((h: GeneratedMessage[]) => { const next = [msg, ...h]; return next })
    // clear session
    setSession(null)
    try { localStorage.removeItem('activeSession') } catch (e) {}
  }

  function handleCancelSession() {
    setSession(null)
    setScreen('home')
    try { localStorage.removeItem('activeSession') } catch (e) {}
  }

  function handleLandingComplete() {
    setScreen('home')
  }

  function handleDoneViewing() {
    setScreen('home')
  }

  function navigateTo(destination: typeof screen) {
    setScreen(destination)
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {screen === 'landing' && <Landing onComplete={handleLandingComplete} />}
        {screen === 'home' && <Home onStart={startSession} />}
        {screen === 'session' && session && <Session session={session} onPanic={handlePanic} onCancel={handleCancelSession} />}
        {screen === 'message' && lastMessage && <MessageReceived msg={lastMessage} onDone={handleDoneViewing} />}
        {screen === 'history' && <History items={history} />}
      </div>

      {/* Modern Navigation Bar - Bottom on mobile, hidden on landing/home */}
      {screen !== 'landing' && screen !== 'home' && (
        <>
          {/* Mobile Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40 animate-slide-up">
            <div className="flex items-center justify-around py-2 px-4">
              <button 
                onClick={() => navigateTo('home')} 
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  screen === 'home' ? 'text-primary-600 bg-primary-50' : 'text-gray-600'
                }`}
              >
                <span className="text-2xl">🏠</span>
                <span className="text-xs font-medium">Home</span>
              </button>
              <button 
                onClick={() => navigateTo('history')} 
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  screen === 'history' ? 'text-primary-600 bg-primary-50' : 'text-gray-600'
                }`}
              >
                <span className="text-2xl">📜</span>
                <span className="text-xs font-medium">History</span>
              </button>
            </div>
          </nav>

          {/* Desktop Navigation Buttons */}
          <div className="hidden md:flex fixed top-6 left-6 gap-3 z-40 animate-fade-in">
            <button 
              onClick={() => navigateTo('home')} 
              className={`btn-secondary ${screen === 'home' ? 'ring-2 ring-primary-500' : ''}`}
            >
              🏠 Home
            </button>
            <button 
              onClick={() => navigateTo('history')} 
              className={`btn-secondary ${screen === 'history' ? 'ring-2 ring-primary-500' : ''}`}
            >
              📜 History
            </button>
          </div>
        </>
      )}
    </div>
  )
}
