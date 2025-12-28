import templates from '../data/templates'
import { Severity, Culture } from '../types'

export function pickTemplateById(id: string) {
  return templates.find(t => t.id === id)
}

export function pickRandomMessage(templateId: string, severity: Severity, name: string, relation: string, culture: Culture = 'neutral') {
  const t = pickTemplateById(templateId)
  if (!t) return null
  const arr = t.messagesBySeverity[severity]
  const raw = arr[Math.floor(Math.random() * arr.length)]
  const detail = randomDetail()
  let message = raw.replace(/\{NAME\}/g, name).replace(/\{RELATION\}/g, relation).replace(/\{DETAIL\}/g, detail)
  return applyCulture(message, culture)
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

function applyCulture(message: string, culture: Culture): string {
  switch (culture) {
    case 'german':
      // Logistically detailed, emotionally cold
      return message.replace(/!/g, '').replace(/\?/g, '').replace(/:/g, ': ') + ' Please confirm receipt.'
    case 'mediterranean':
      // Chaotic, emotional, lots of exclamation points
      return message.replace(/!/g, '!!!').replace(/\?/g, '?!').replace(/:/g, ': ') + ' Mamma mia!'
    case 'scandinavian':
      // Vague but deeply concerning
      return message.replace(/!/g, '').replace(/\?/g, '...').replace(/:/g, ': ') + ' It is concerning.'
    default:
      return message
  }
}
