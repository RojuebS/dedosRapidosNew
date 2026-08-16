import { Bomb } from '@/types/game'
import { GAME_CONFIG } from '@/constants/game'

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function createBomb(baseFallDuration: number): Bomb {
  const variance = baseFallDuration * GAME_CONFIG.FALL_DURATION_VARIANCE
  return {
    id: crypto.randomUUID(),
    digit: Math.floor(Math.random() * 10),
    x: randomBetween(5, 85),
    duration: baseFallDuration + randomBetween(-variance, variance),
    spawnedAt: Date.now(),
    exploding: false,
  }
}
