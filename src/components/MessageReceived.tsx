import React from 'react'
import { GeneratedMessage } from '../types'
import MessageCard from './MessageCard'
import { pickTemplateById } from '../utils/templateUtils'

export default function MessageReceived({ msg, onDone }: { msg: GeneratedMessage, onDone: ()=>void }) {
  const template = pickTemplateById(msg.templateId)
  const scripts = template ? template.postEscapeScriptsBySeverity[msg.severity] : []

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Incoming Message</h2>
      <MessageCard msg={msg} />

      <div className="mt-4">
        <h3 className="font-semibold">Post-escape scripts</h3>
        <ul className="mt-2 space-y-2">
          {scripts.map((s,i) => (
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
