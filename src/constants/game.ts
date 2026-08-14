export const GAME_CONFIG = {
  INITIAL_LIVES: 3,
  INITIAL_LEVEL: 1,
  POINTS_PER_LEVEL: 4,

  // Base fall duration in ms (decreases each level)
  BASE_FALL_DURATION: 6000,
  FALL_DURATION_MULTIPLIER: 0.999,
  FALL_DURATION_VARIANCE: 0.2, // ±20%

  // Spawn interval in ms (decreases each level)
  BASE_SPAWN_INTERVAL: 800,
  SPAWN_INTERVAL_MULTIPLIER: 0.9,

  // Probability of spawning extra bombs per tick
  DOUBLE_BOMB_CHANCE: 0.10,
  TRIPLE_BOMB_CHANCE: 0.01,

  // Flash duration when player makes a mistake
  FLASH_DURATION_MS: 300,

  // Explosion animation duration
  EXPLODE_DURATION_MS: 500,
} as const

export const LEADERBOARD_SIZE = 15
