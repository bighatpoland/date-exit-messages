import React from 'react'
import { GeneratedMessage } from '../types'

export default function History({ items }: { items: GeneratedMessage[] }) {
  if (!items.length) return <div className="p-4 max-w-md mx-auto">No history yet.</div>
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">History</h2>
      <ul className="mt-2 space-y-2">
        {items.map(it => (
          <li key={it.id} className="p-3 bg-white rounded shadow">
            <div className="flex justify-between">
              <div className="font-semibold">{it.senderName}</div>
              <div className="text-sm text-gray-500">{new Date(it.createdAt).toLocaleString()}</div>
            </div>
            <div className="mt-1">{it.body}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
