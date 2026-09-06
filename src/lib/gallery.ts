/** Deal items into `rowCount` rows round-robin, keeping row lengths within one of each other. */
export function splitIntoRows<T>(items: readonly T[], rowCount: number): T[][] {
  if (!Number.isInteger(rowCount) || rowCount < 1) {
    throw new Error(`rowCount must be a positive integer, got ${rowCount}`)
  }
  const rows: T[][] = Array.from({ length: rowCount }, () => [])
  items.forEach((item, index) => rows[index % rowCount].push(item))
  return rows
}
