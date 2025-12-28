import React, { useState } from 'react'
import templates from '../data/templates'
import { Severity, DeliveryMode, DateSession, Culture } from '../types'

export default function Home({ onStart }: { onStart: (s: DateSession) => void }) {
  const [templateId, setTemplateId] = useState(templates[0].id)
  const [relation, setRelation] = useState(templates[0].senderOptions[0])
  const [senderName, setSenderName] = useState(relation)
  const [severity, setSeverity] = useState<Severity>('mild')
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('instant')
  const [delay, setDelay] = useState<number>(5)
  const [culture, setCulture] = useState<Culture>('neutral')
  const [timeInDate, setTimeInDate] = useState<number>(30)

  function start() {
    const s: DateSession = {
      isActive: true,
      startedAt: Date.now(),
      templateId,
      senderName,
      relationLabel: relation,
      severity,
      deliveryMode,
      delayMinutes: deliveryMode === 'scheduled' ? delay : undefined,
      scheduledAt: deliveryMode === 'scheduled' ? Date.now() + delay * 60000 : undefined,
      culture,
    }
    onStart(s)
    try { localStorage.setItem('lastSessionConfig', JSON.stringify(s)) } catch (e) {}
  }

  function onTemplateChange(id: string) {
    setTemplateId(id)
    const t = templates.find(x => x.id === id)!
    setRelation(t.senderOptions[0])
    setSenderName(t.senderOptions[0])
  }

  function suggestDelay() {
    if (timeInDate < 15) return 12 // too early
    if (timeInDate < 45) return 37 // realistic
    return 60 // after dessert
  }

  function getMoralWeight() {
    if (severity === 'mild') return '😇 harmless'
    if (severity === 'medium') return '😐 questionable'
    return '😬 you owe the universe one'
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">Oh No, Emergency!</h1>
      <p className="text-sm text-gray-600 mb-4">Simulated messages for awkward situations. Don’t use for real emergencies.</p>

      <label className="block text-sm font-medium">How long into the date? (minutes)</label>
      <input type="number" value={timeInDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimeInDate(Number(e.target.value))} className="w-full p-2 my-2 border rounded" min={0} />
      <p className="text-xs text-gray-500">Suggested delay: {suggestDelay()} min</p>

      <label className="block text-sm font-medium">Scenario</label>
      <select value={templateId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onTemplateChange(e.target.value)} className="w-full p-2 my-2 border rounded">
        {templates.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
      </select>

      <label className="block text-sm font-medium">Sender / Relation</label>
      <select value={relation} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setRelation(e.target.value); setSenderName(e.target.value) }} className="w-full p-2 my-2 border rounded">
        {templates.find(t => t.id === templateId)!.senderOptions.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <label className="block text-sm font-medium">Sender name</label>
      <input value={senderName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenderName(e.target.value)} className="w-full p-2 my-2 border rounded" />

      <label className="block text-sm font-medium">Plausibility</label>
      <div className="flex gap-2 my-2">
        <button onClick={() => setSeverity('mild')} className={`px-3 py-2 rounded ${severity==='mild'?'bg-green-200':'bg-white'}`}>Believable</button>
        <button onClick={() => setSeverity('medium')} className={`px-3 py-2 rounded ${severity==='medium'?'bg-yellow-200':'bg-white'}`}>Dramatic</button>
        <button onClick={() => setSeverity('nuclear')} className={`px-3 py-2 rounded ${severity==='nuclear'?'bg-red-200':'bg-white'}`}>Nuclear Exit</button>
      </div>
      <p className="text-xs text-gray-500">Moral weight: {getMoralWeight()}</p>
      {severity === 'nuclear' && <p className="text-xs text-red-500">Warning: This might haunt you later.</p>}

      <label className="block text-sm font-medium">Cultural Mode</label>
      <select value={culture} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCulture(e.target.value as Culture)} className="w-full p-2 my-2 border rounded">
        <option value="neutral">Neutral</option>
        <option value="german">German (detailed, cold)</option>
        <option value="mediterranean">Mediterranean (chaotic, emotional)</option>
        <option value="scandinavian">Scandinavian (vague, concerning)</option>
      </select>

      <label className="block text-sm font-medium">Delivery Mode</label>
      <div className="flex gap-2 my-2 items-center">
        <label className="flex items-center gap-2"><input type="radio" checked={deliveryMode==='instant'} onChange={() => setDeliveryMode('instant')} /> Instant</label>
        <label className="flex items-center gap-2"><input type="radio" checked={deliveryMode==='scheduled'} onChange={() => setDeliveryMode('scheduled')} /> Scheduled</label>
      </div>

      {deliveryMode === 'scheduled' && (
        <div>
          <label className="block text-sm">Delay (minutes)</label>
          <input type="number" value={delay} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDelay(Number(e.target.value))} className="w-full p-2 my-2 border rounded" min={1} />
        </div>
      )}

      <button onClick={start} className="w-full mt-4 p-4 panic-btn">Start Session</button>
    </div>
  )
}
