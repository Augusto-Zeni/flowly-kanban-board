export function computeInsertPosition(before: number | null, after: number | null): number {
  if (before === null && after === null)
    throw new Error('before e after não podem ser ambos null')
  if (before === null)
    return after! - 1
  if (after === null)
    return before + 1
  return (before + after) / 2
}

export function shouldRenumber(positions: number[]): boolean {
  const sorted = [...positions].sort((a, b) => a - b)
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] - sorted[i - 1] < 1e-9)
      return true
  }
  return false
}
