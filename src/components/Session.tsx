import React, { useEffect, useRef, useState } from 'react'
import { DateSession, GeneratedMessage } from '../types'
import { pickRandomMessage } from '../utils/templateUtils'

export default function Session({ session, onPanic, onCancel }: { session: DateSession, onPanic: (msg: GeneratedMessage)=>void, onCancel: ()=>void }) {
  const [remainingMs, setRemainingMs] = useState<number | null>(null)
  const [isPulsing, setIsPulsing] = useState(false)
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
      // Add pulsing effect when less than 30 seconds
      setIsPulsing(ms < 30000)
    }
  }

  function doPanic() {
    // build message
    const body = pickRandomMessage(session.templateId, session.severity, session.senderName, session.relationLabel, session.culture) || 'Please call me.'
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
    <div className="p-6 max-w-md mx-auto animate-fade-in">
      {/* Session Info Card */}
      <div className="card mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-2xl shadow-card">
            🚨
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Active Session</h2>
            <p className="text-sm text-gray-600 mt-1">Ready for emergency exit</p>
          </div>
        </div>
        
        <div className="space-y-2 bg-gray-50 rounded-xl p-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Scenario:</span>
            <span className="font-medium text-gray-900">{session.templateId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sender:</span>
            <span className="font-medium text-gray-900">{session.senderName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Mode:</span>
            <span className="font-medium text-gray-900 capitalize">{session.deliveryMode}</span>
          </div>
        </div>
      </div>

      {/* Scheduled Timer */}
      {session.deliveryMode === 'scheduled' && (
        <div className="card mb-6 text-center">
          {remainingMs === null ? (
            <div className="text-gray-500 py-4">
              <div className="animate-pulse">Scheduling...</div>
            </div>
          ) : (
            <div className="py-2">
              <div className="text-sm text-gray-600 mb-2">Message arrives in</div>
              <div className={`text-6xl font-bold font-mono ${isPulsing ? 'text-red-600 animate-pulse-slow' : 'text-gray-900'}`}>
                {formatMs(remainingMs)}
              </div>
              {isPulsing && (
                <div className="mt-3 text-sm text-red-600 font-medium animate-bounce-gentle">
                  Almost time! 🔥
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Panic Button */}
      <div className="mb-6">
        <button onClick={handleImmediatePanic} className="panic-btn group relative overflow-hidden">
          <span className="relative z-10 flex items-center justify-center gap-3">
            <span className="text-3xl group-active:scale-110 transition-transform">⚠️</span>
            <span>PANIC NOW</span>
          </span>
        </button>
        <p className="text-xs text-center text-gray-500 mt-3">
          Tap to send emergency message instantly
        </p>
      </div>

      {/* Cancel Button */}
      {session.deliveryMode === 'scheduled' && (
        <button onClick={handleCancel} className="btn-secondary w-full">
          Cancel Session
        </button>
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
