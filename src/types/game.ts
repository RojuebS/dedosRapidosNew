export type GameStatus = 'idle' | 'playing' | 'paused' | 'phaseup' | 'gameover'

export interface Bomb {
  id: string
  digit: number
  x: number        // percentage from left (0-100)
  duration: number // fall duration in ms
  spawnedAt: number
  exploding: boolean
}

export interface GameState {
  status: GameStatus
  score: number
  level: number
  phase: number
  lives: number
  bombs: Bomb[]
  isFlashing: boolean
  pausedAt: number | null
}

export type GameAction =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESTART' }
  | { type: 'SPAWN_BOMB'; bomb: Bomb }
  | { type: 'EXPLODE_BOMB'; id: string }
  | { type: 'REMOVE_BOMB'; id: string }
  | { type: 'BOMB_MISSED'; id: string }
  | { type: 'WRONG_KEY' }
  | { type: 'FLASH_END' }
  | { type: 'PHASE_UP_CONTINUE' }
