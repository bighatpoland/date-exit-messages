import React from 'react'
import { GeneratedMessage } from '../types'
import MessageCard from './MessageCard'

const SCRIPTS = [
  "I'm so sorry — something urgent came up. I need to go.",
  "Can I get back to you later? Today got complicated.",
  "I'd rather explain after I handle this.",
  "I really need to step out — can we catch up another time?",
]

export default function MessageReceived({ msg, onDone }: { msg: GeneratedMessage, onDone: ()=>void }) {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Incoming Message</h2>
      <MessageCard msg={msg} />

      <div className="mt-4">
        <h3 className="font-semibold">Post-escape scripts</h3>
        <ul className="mt-2 space-y-2">
          {SCRIPTS.map((s,i) => (
            <li key={i} className="p-2 border rounded bg-white">{s}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <button onClick={onDone} className="p-2 rounded border">Done</button>
      </div>
    </div>
  )
}
