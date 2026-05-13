import { describe, expect, it } from 'vitest'
import { computeInsertPosition, shouldRenumber } from '../board-position'

describe('computeInsertPosition', () => {
  it('retorna after - 1 quando before é null', () => {
    expect(computeInsertPosition(null, 1000)).toBe(999)
  })

  it('retorna before + 1 quando after é null', () => {
    expect(computeInsertPosition(1000, null)).toBe(1001)
  })

  it('retorna a média entre before e after', () => {
    expect(computeInsertPosition(1000, 2000)).toBe(1500)
  })

  it('retorna a média correta para valores próximos', () => {
    expect(computeInsertPosition(1000, 1001)).toBe(1000.5)
  })

  it('retorna a média correta para inserção no início da lista', () => {
    expect(computeInsertPosition(null, 0)).toBe(-1)
  })

  it('lança erro quando ambos before e after são null', () => {
    expect(() => computeInsertPosition(null, null)).toThrow()
  })
})

describe('shouldRenumber', () => {
  it('retorna false quando as diferenças são maiores que 1e-9', () => {
    expect(shouldRenumber([1000, 2000, 3000])).toBe(false)
  })

  it('retorna true quando diferença entre adjacentes é menor que 1e-9', () => {
    const base = 1000
    const tiny = 1e-10
    expect(shouldRenumber([base, base + tiny])).toBe(true)
  })

  it('retorna true quando diferença entre adjacentes é exatamente 0 (duplicados)', () => {
    expect(shouldRenumber([1000, 1000])).toBe(true)
  })

  it('retorna false para lista com um único elemento', () => {
    expect(shouldRenumber([1000])).toBe(false)
  })

  it('retorna false para lista vazia', () => {
    expect(shouldRenumber([])).toBe(false)
  })

  it('ordena antes de comparar diferenças', () => {
    expect(shouldRenumber([3000, 1000, 2000])).toBe(false)
  })

  it('detecta necessidade de renumeração após múltiplas inserções no mesmo intervalo', () => {
    const positions = [0, 1000]
    for (let i = 0; i < 60; i++) {
      const last = positions[positions.length - 1]
      const secondToLast = positions[positions.length - 2]
      positions.push((secondToLast + last) / 2)
    }
    expect(shouldRenumber(positions)).toBe(true)
  })
})
