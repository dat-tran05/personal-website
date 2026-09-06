import { describe, expect, it } from 'vitest'
import { splitIntoRows } from './gallery'

describe('splitIntoRows', () => {
  it('deals items round-robin so rows stay balanced', () => {
    expect(splitIntoRows([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
      [1, 4, 7],
      [2, 5],
      [3, 6],
    ])
  })
  it('returns empty rows for empty input', () => {
    expect(splitIntoRows([], 3)).toEqual([[], [], []])
  })
  it('rejects a non-positive row count', () => {
    expect(() => splitIntoRows([1], 0)).toThrow()
  })
})
