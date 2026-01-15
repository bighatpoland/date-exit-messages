import React from 'react'
import { GeneratedMessage } from '../types'

export default function History({ items }: { items: GeneratedMessage[] }) {
  if (!items.length) {
    return (
      <div className="p-6 max-w-md mx-auto text-center animate-fade-in">
        <div className="py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No History Yet</h3>
          <p className="text-gray-600 text-sm">Your past escape messages will appear here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-md mx-auto animate-fade-in pb-24">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📜 History</h2>
        <p className="text-sm text-gray-600">{items.length} escape {items.length === 1 ? 'message' : 'messages'}</p>
      </div>

      <div className="space-y-4">
        {items.map((it, index) => {
          const severityColors = {
            mild: 'bg-green-100 text-green-700',
            medium: 'bg-yellow-100 text-yellow-700',
            nuclear: 'bg-red-100 text-red-700'
          }
          
          return (
            <div key={it.id} className="card-hover animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {it.senderName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-gray-900 truncate">{it.senderName}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${severityColors[it.severity]}`}>
                      {it.severity}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(it.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 line-clamp-3">
                {it.body}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
