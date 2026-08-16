import { GAME_CONFIG, PHASE_TABLE, MAX_BOMBS_BY_LEVEL } from '@/constants/game'

export interface DifficultyParams {
  fallDuration: number
  spawnInterval: number
}

export function computeDifficulty(phase: number): DifficultyParams {
  const index = Math.min(phase - 1, PHASE_TABLE.length - 1)
  return { ...PHASE_TABLE[index] }
}

export function computeMaxBombs(level: number): number {
  const capped = Math.min(level, Object.keys(MAX_BOMBS_BY_LEVEL).length)
  return MAX_BOMBS_BY_LEVEL[capped]
}

export function computePhase(score: number): number {
  return Math.floor(score / GAME_CONFIG.POINTS_PER_PHASE) + 1
}

export function computeLevel(score: number): number {
  const scoreInPhase = score % GAME_CONFIG.POINTS_PER_PHASE
  return Math.floor(scoreInPhase / GAME_CONFIG.POINTS_PER_LEVEL) + 1
}
