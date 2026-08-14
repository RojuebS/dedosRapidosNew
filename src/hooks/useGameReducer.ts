import { useReducer } from 'react'
import { GameState, GameAction } from '@/types/game'
import { computeLevel } from '@/services/game/difficultyEngine'
import { GAME_CONFIG } from '@/constants/game'

const INITIAL_STATE: GameState = {
  status: 'idle',
  score: 0,
  level: 1,
  lives: GAME_CONFIG.INITIAL_LIVES,
  bombs: [],
  isFlashing: false,
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START':
      return { ...INITIAL_STATE, status: 'playing' }

    case 'RESTART':
      return { ...INITIAL_STATE, status: 'playing' }

    case 'PAUSE':
      return state.status === 'playing' ? { ...state, status: 'paused' } : state

    case 'RESUME':
      return state.status === 'paused' ? { ...state, status: 'playing' } : state

    case 'SPAWN_BOMB':
      return { ...state, bombs: [...state.bombs, action.bomb] }

    case 'EXPLODE_BOMB': {
      // Mark bomb as exploding and add score immediately
      const newScore = state.score + state.level
      return {
        ...state,
        score: newScore,
        level: computeLevel(newScore),
        bombs: state.bombs.map((b) =>
          b.id === action.id ? { ...b, exploding: true } : b,
        ),
      }
    }

    case 'REMOVE_BOMB':
      // Called after explosion animation ends
      return { ...state, bombs: state.bombs.filter((b) => b.id !== action.id) }

    case 'BOMB_MISSED': {
      const newLives = state.lives - 1
      return {
        ...state,
        lives: newLives,
        isFlashing: true,
        bombs: state.bombs.filter((b) => b.id !== action.id),
        status: newLives <= 0 ? 'gameover' : state.status,
      }
    }

    case 'WRONG_KEY': {
      const newLives = state.lives - 1
      return {
        ...state,
        lives: newLives,
        isFlashing: true,
        status: newLives <= 0 ? 'gameover' : state.status,
      }
    }

    case 'FLASH_END':
      return { ...state, isFlashing: false }

    default:
      return state
  }
}

export function useGameReducer() {
  return useReducer(gameReducer, INITIAL_STATE)
}
