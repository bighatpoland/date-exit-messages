import React from 'react'
import { GeneratedMessage } from '../types'

export default function MessageCard({ msg }: { msg: GeneratedMessage }) {
  const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return (
    <div className="p-4 max-w-md mx-auto mt-6">
      <div className="sender-bubble">
        <div className="flex items-center justify-between mb-2">
          <div className="font-bold">{msg.senderName}</div>
          <div className="text-sm text-gray-500">{time}</div>
        </div>
        <div className="whitespace-pre-wrap">{msg.body}</div>
      </div>
    </div>
  )
}
