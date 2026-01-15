import React from 'react'
import { GeneratedMessage } from '../types'
import MessageCard from './MessageCard'
import { pickTemplateById } from '../utils/templateUtils'

export default function MessageReceived({ msg, onDone }: { msg: GeneratedMessage, onDone: ()=>void }) {
  const template = pickTemplateById(msg.templateId)
  const scripts = template ? template.postEscapeScriptsBySeverity[msg.severity] : []

  return (
    <div className="p-6 max-w-md mx-auto animate-fade-in pb-24">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-3 shadow-float animate-bounce-gentle">
          <span className="text-3xl">✅</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
        <p className="text-sm text-gray-600">Your escape plan is in motion</p>
      </div>

      <MessageCard msg={msg} />

      {scripts.length > 0 && (
        <div className="card mt-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💬</span>
            <h3 className="font-bold text-gray-900">Post-Escape Scripts</h3>
          </div>
          <div className="space-y-3">
            {scripts.map((s, i) => (
              <div key={i} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700 flex-1">{s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 space-y-3">
        <button onClick={onDone} className="btn-primary w-full">
          Done
        </button>
        <p className="text-xs text-center text-gray-500">
          Remember: Use these powers responsibly! 😇
        </p>
      </div>
    </div>
  )
}
