import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('resolves conflicting classes using the latter value', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('ignores falsy values', () => {
    expect(cn('px-2', undefined, null, false, '')).toBe('px-2')
  })
})
