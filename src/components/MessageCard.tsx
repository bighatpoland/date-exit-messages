import React from 'react'
import { GeneratedMessage } from '../types'

export default function MessageCard({ msg }: { msg: GeneratedMessage }) {
  const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  
  const severityConfig = {
    mild: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700' },
    medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700' },
    nuclear: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700' }
  }
  
  const config = severityConfig[msg.severity]
  
  return (
    <div className="animate-slide-up">
      <div className={`sender-bubble ${config.bg} border-2 ${config.border}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold">
              {msg.senderName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-bold text-gray-900">{msg.senderName}</div>
              <div className="text-xs text-gray-500">{time}</div>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.badge}`}>
            {msg.severity}
          </span>
        </div>
        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">{msg.body}</div>
      </div>
    </div>
  )
}
