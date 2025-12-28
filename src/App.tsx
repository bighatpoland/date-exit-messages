import React, { useEffect, useState } from 'react'
import Home from './components/Home'
import Session from './components/Session'
import MessageReceived from './components/MessageReceived'
import History from './components/History'
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
  const [screen, setScreen] = useState<'home'|'session'|'message'|'history'>('home')
  const [session, setSession] = useState<DateSession | null>(null)
  const [lastMessage, setLastMessage] = useState<GeneratedMessage | null>(null)
  const [history, setHistory] = useState<GeneratedMessage[]>(() => loadHistory())

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

  function handleDoneViewing() {
    setLastMessage(null)
    setScreen('home')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center pb-16 md:pb-0">
        {screen === 'home' && <Home onStart={startSession} />}
        {screen === 'session' && session && <Session session={session} onPanic={handlePanic} onCancel={handleCancelSession} />}
        {screen === 'message' && lastMessage && <MessageReceived msg={lastMessage} onDone={handleDoneViewing} />}
      </div>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-4 md:hidden">
        <button onClick={() => setScreen('home')} className={`flex flex-col items-center p-2 rounded ${screen === 'home' ? 'text-blue-500' : 'text-gray-500'}`}>
          <span className="text-lg">🏠</span>
          <span className="text-xs">Home</span>
        </button>
        <button onClick={() => setScreen('history')} className={`flex flex-col items-center p-2 rounded ${screen === 'history' ? 'text-blue-500' : 'text-gray-500'}`}>
          <span className="text-lg">📜</span>
          <span className="text-xs">History</span>
        </button>
      </div>
      {/* Desktop Navigation */}
      <div className="fixed top-4 left-4 flex gap-2 hidden md:flex">
        <button onClick={() => setScreen('home')} className="p-2 bg-white rounded shadow">Home</button>
        <button onClick={() => setScreen('history')} className="p-2 bg-white rounded shadow">History</button>
      </div>
      {screen === 'history' && <div className="fixed inset-0 bg-black bg-opacity-30 p-4 z-10">
        <div className="max-w-md mx-auto bg-white rounded p-4 mt-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">History</h3>
            <button onClick={() => setScreen('home')} className="px-2 py-1 border rounded">Close</button>
          </div>
          <History items={history} />
        </div>
      </div>}
    </div>
  )
}
