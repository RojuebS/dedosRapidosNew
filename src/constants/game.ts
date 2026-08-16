export const GAME_CONFIG = {
  INITIAL_LIVES: 3,
  POINTS_PER_LEVEL: 4,
  POINTS_PER_PHASE: 20,

  FALL_DURATION_VARIANCE: 0.2, // ±20% randomness per bomb

  FLASH_DURATION_MS: 300,
  EXPLODE_DURATION_MS: 500,
} as const

// Phase controls speed — one row per phase; last row repeats for phases beyond the table
export const PHASE_TABLE = [
  { fallDuration: 5000, spawnInterval: 900 }, // Phase 1
  { fallDuration: 4000, spawnInterval: 750 }, // Phase 2
  { fallDuration: 3000, spawnInterval: 600 }, // Phase 3
  { fallDuration: 2200, spawnInterval: 480 }, // Phase 4
  { fallDuration: 1800, spawnInterval: 400 }, // Phase 5+
] as const

// Level controls max bombs on screen simultaneously
export const MAX_BOMBS_BY_LEVEL: Record<number, number> = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
}

export const LEADERBOARD_SIZE = 15
