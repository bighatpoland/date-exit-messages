import templates from '../data/templates'
import { Severity } from '../types'

export function pickTemplateById(id: string) {
  return templates.find(t => t.id === id)
}

export function pickRandomMessage(templateId: string, severity: Severity, name: string, relation: string) {
  const t = pickTemplateById(templateId)
  if (!t) return null
  const arr = t.messagesBySeverity[severity]
  const raw = arr[Math.floor(Math.random() * arr.length)]
  const detail = randomDetail()
  return raw.replace(/\{NAME\}/g, name).replace(/\{RELATION\}/g, relation).replace(/\{DETAIL\}/g, detail)
}

function randomDetail() {
  const details = [
    'there was a loud crash',
    'the vet office called with bad news',
    'the boiler burst',
    'a neighbor needs urgent help',
    'they started choking',
    'the building alarm went off',
  ]
  return details[Math.floor(Math.random() * details.length)]
}
