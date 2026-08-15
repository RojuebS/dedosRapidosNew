import { GAME_CONFIG } from '@/constants/game'

export interface DifficultyParams {
  fallDuration: number
  spawnInterval: number
}

export function computePhase(score: number): number {
  return Math.floor(score / GAME_CONFIG.POINTS_PER_PHASE) + 1
}

export function computeLevel(score: number): number {
  const scoreInPhase = score % GAME_CONFIG.POINTS_PER_PHASE
  return Math.floor(scoreInPhase / GAME_CONFIG.POINTS_PER_LEVEL) + 1
}

export function computeDifficulty(level: number, phase: number): DifficultyParams {
  const levelSteps = level - 1
  const phaseSteps = phase - 1
  return {
    fallDuration:
      GAME_CONFIG.BASE_FALL_DURATION *
      Math.pow(GAME_CONFIG.PHASE_SPEED_MULTIPLIER, phaseSteps) *
      Math.pow(GAME_CONFIG.FALL_DURATION_MULTIPLIER, levelSteps),
    spawnInterval:
      GAME_CONFIG.BASE_SPAWN_INTERVAL *
      Math.pow(GAME_CONFIG.PHASE_SPEED_MULTIPLIER, phaseSteps) *
      Math.pow(GAME_CONFIG.SPAWN_INTERVAL_MULTIPLIER, levelSteps),
  }
}
