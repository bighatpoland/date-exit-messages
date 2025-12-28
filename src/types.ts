export type Severity = 'mild' | 'medium' | 'nuclear'
export type DeliveryMode = 'instant' | 'scheduled'

export type DateSession = {
  isActive: boolean
  startedAt: number
  templateId: string
  senderName: string
  relationLabel: string
  severity: Severity
  deliveryMode: DeliveryMode
  delayMinutes?: number
  scheduledAt?: number
}

export type GeneratedMessage = {
  id: string
  createdAt: number
  senderName: string
  body: string
  severity: Severity
  templateId: string
}

export type Template = {
  id: string
  title: string
  senderOptions: string[]
  messagesBySeverity: {
    mild: string[]
    medium: string[]
    nuclear: string[]
  }
}
