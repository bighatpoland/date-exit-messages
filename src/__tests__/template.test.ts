import { describe, it, expect } from 'vitest'
import { pickRandomMessage } from '../utils/templateUtils'

describe('template utils', () => {
  it('replaces placeholders', () => {
    const out = pickRandomMessage('dog-sick', 'mild', 'Mum', 'Mom')
    expect(out).toBeTruthy()
    expect(out).not.toContain('{NAME}')
    expect(out).not.toContain('{RELATION}')
  })
})
