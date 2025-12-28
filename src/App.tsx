import React, { useEffect, useState } from 'react'
import Home from './components/Home'
import Session from './components/Session'
import MessageReceived from './components/MessageReceived'
import History from './components/History'
import { DateSession, GeneratedMessage } from './types'

function loadHistory(): GeneratedMessage[] {
  try {
    const raw = localStorage.getItem('history')
    return raw ? JSON.parse(raw) : []
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
    setHistory(h => { const next = [msg, ...h]; return next })
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
    <div className="min-h-screen flex flex-col items-center">
      {screen === 'home' && <Home onStart={startSession} />}
      {screen === 'session' && session && <Session session={session} onPanic={handlePanic} onCancel={handleCancelSession} />}
      {screen === 'message' && lastMessage && <MessageReceived msg={lastMessage} onDone={handleDoneViewing} />}
      <div className="fixed bottom-4 left-4 right-4 flex justify-between max-w-md mx-auto">
        <button onClick={() => setScreen('home')} className="p-2 bg-white rounded shadow">Home</button>
        <button onClick={() => setScreen('history')} className="p-2 bg-white rounded shadow">History</button>
      </div>
      {screen === 'history' && <div className="fixed inset-0 bg-black bg-opacity-30 p-4">
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
