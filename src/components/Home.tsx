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
    <div className="p-6 max-w-md mx-auto animate-fade-in pb-24">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          Oh No, Emergency!
        </h1>
        <p className="text-sm text-gray-600">Simulated messages for awkward situations. Don't use for real emergencies.</p>
      </div>

      {/* Date Duration */}
      <div className="card mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">⏱️ How long into the date?</label>
        <div className="flex items-center gap-3">
          <input 
            type="number" 
            value={timeInDate} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimeInDate(Math.max(0, Math.min(300, Number(e.target.value))))} 
            className="input flex-1" 
            min={0} 
            placeholder="30"
          />
          <span className="text-gray-600 font-medium">min</span>
        </div>
        <div className="mt-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-700">💡 Suggested delay: <span className="font-semibold">{suggestDelay()} min</span></p>
        </div>
      </div>

      {/* Scenario */}
      <div className="card mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">📱 Scenario</label>
        <select value={templateId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onTemplateChange(e.target.value)} className="select">
          {templates.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>

      {/* Sender */}
      <div className="card mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">👤 Sender / Relation</label>
        <select value={relation} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setRelation(e.target.value); setSenderName(e.target.value) }} className="select mb-3">
          {templates.find(t => t.id === templateId)!.senderOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        
        <label className="block text-xs font-medium text-gray-600 mb-2">Custom name</label>
        <input value={senderName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenderName(e.target.value.replace(/[^a-zA-Z0-9\s]/g, '').slice(0,20).trim())} className="input" placeholder="Enter name..." />
      </div>

      {/* Plausibility */}
      <div className="card mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-3">🎭 Plausibility</label>
        <div className="toggle-group">
          <button onClick={() => setSeverity('mild')} className={severity==='mild'?'toggle-btn-active':'toggle-btn'}>
            <div className="text-lg mb-1">😇</div>
            <div className="text-xs">Believable</div>
          </button>
          <button onClick={() => setSeverity('medium')} className={severity==='medium'?'toggle-btn-active':'toggle-btn'}>
            <div className="text-lg mb-1">😐</div>
            <div className="text-xs">Dramatic</div>
          </button>
          <button onClick={() => setSeverity('nuclear')} className={severity==='nuclear'?'toggle-btn-active':'toggle-btn'}>
            <div className="text-lg mb-1">😬</div>
            <div className="text-xs">Nuclear</div>
          </button>
        </div>
        <div className="mt-3 text-center">
          <span className="text-sm text-gray-600">Moral weight: <span className="font-medium">{getMoralWeight()}</span></span>
        </div>
        {severity === 'nuclear' && (
          <div className="mt-3 px-3 py-2 bg-red-50 rounded-lg border border-red-200 animate-scale-in">
            <p className="text-xs text-red-700 font-medium">⚠️ Warning: This might haunt you later.</p>
          </div>
        )}
      </div>

      {/* Cultural Mode */}
      <div className="card mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">🌍 Cultural Mode</label>
        <select value={culture} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCulture(e.target.value as Culture)} className="select">
          <option value="neutral">🌐 Neutral</option>
          <option value="german">🇩🇪 German (detailed, cold)</option>
          <option value="mediterranean">🏖️ Mediterranean (chaotic, emotional)</option>
          <option value="scandinavian">❄️ Scandinavian (vague, concerning)</option>
        </select>
      </div>

      {/* Delivery Mode */}
      <div className="card mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-3">⚡ Delivery Mode</label>
        <div className="toggle-group">
          <button onClick={() => setDeliveryMode('instant')} className={deliveryMode==='instant'?'toggle-btn-active':'toggle-btn'}>
            <div className="text-lg mb-1">⚡</div>
            <div className="text-xs">Instant</div>
          </button>
          <button onClick={() => setDeliveryMode('scheduled')} className={deliveryMode==='scheduled'?'toggle-btn-active':'toggle-btn'}>
            <div className="text-lg mb-1">⏰</div>
            <div className="text-xs">Scheduled</div>
          </button>
        </div>

        {deliveryMode === 'scheduled' && (
          <div className="mt-4 animate-slide-down">
            <label className="block text-xs font-medium text-gray-600 mb-2">Delay (minutes)</label>
            <input type="number" value={delay} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDelay(Math.max(1, Math.min(120, Number(e.target.value))))} className="input" min={1} placeholder="5" />
          </div>
        )}
      </div>

      {/* Start Button */}
      <button onClick={start} className="panic-btn">
        🚨 Start Session
      </button>
    </div>
  )
}
