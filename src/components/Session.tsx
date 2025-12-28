import React, { useEffect, useRef, useState } from 'react'
import { DateSession, GeneratedMessage } from '../types'
import { pickRandomMessage } from '../utils/templateUtils'
import MessageCard from './MessageCard'

export default function Session({ session, onPanic, onCancel }: { session: DateSession, onPanic: (msg: GeneratedMessage)=>void, onCancel: ()=>void }) {
  const [remainingMs, setRemainingMs] = useState<number | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!session.isActive) return
    if (session.deliveryMode === 'scheduled' && session.scheduledAt) {
      updateRemaining()
      timerRef.current = window.setInterval(updateRemaining, 500)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function updateRemaining() {
    if (!session.scheduledAt) { setRemainingMs(null); return }
    const ms = session.scheduledAt - Date.now()
    if (ms <= 0) {
      // trigger immediately
      doPanic()
    } else {
      setRemainingMs(ms)
    }
  }

  function doPanic() {
    // build message
    const body = pickRandomMessage(session.templateId, session.severity, session.senderName, session.relationLabel) || 'Please call me.'
    const msg: GeneratedMessage = {
      id: String(Date.now()),
      createdAt: Date.now(),
      senderName: session.senderName,
      body,
      severity: session.severity,
      templateId: session.templateId,
    }
    // clear timer
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    onPanic(msg)
  }

  function handleImmediatePanic() {
    doPanic()
  }

  function handleCancel() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    onCancel()
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Active Session</h2>
      <p className="text-sm text-gray-600">Scenario: {session.templateId} — Sender: {session.senderName}</p>

      <div className="mt-6">
        <button onClick={handleImmediatePanic} className="w-full p-6 panic-btn text-xl">PANIC</button>
      </div>

      {session.deliveryMode === 'scheduled' && (
        <div className="mt-4 text-center">
          {remainingMs === null ? <div>Scheduling...</div> : (
            <div>
              <div className="text-sm text-gray-600">Time until message</div>
              <div className="text-2xl font-mono mt-1">{formatMs(remainingMs)}</div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleCancel} className="flex-1 p-2 border rounded">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function formatMs(ms: number | null) {
  if (ms === null) return '--:--'
  const s = Math.max(0, Math.floor(ms / 1000))
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
}
