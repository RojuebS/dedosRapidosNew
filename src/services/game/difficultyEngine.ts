import { GAME_CONFIG } from '@/constants/game'

export interface DifficultyParams {
  fallDuration: number
  spawnInterval: number
}

export function computeDifficulty(level: number): DifficultyParams {
  const steps = level - 1
  return {
    fallDuration:
      GAME_CONFIG.BASE_FALL_DURATION *
      Math.pow(GAME_CONFIG.FALL_DURATION_MULTIPLIER, steps),
    spawnInterval:
      GAME_CONFIG.BASE_SPAWN_INTERVAL *
      Math.pow(GAME_CONFIG.SPAWN_INTERVAL_MULTIPLIER, steps),
  }
}

export function computeLevel(score: number): number {
  return Math.floor(score / GAME_CONFIG.POINTS_PER_LEVEL) + 1
}
