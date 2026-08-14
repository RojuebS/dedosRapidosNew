import { useEffect } from 'react'
import { GameAction, GameState } from '@/types/game'

export function useKeyboardInput(
  state: GameState,
  dispatch: React.Dispatch<GameAction>,
) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === 'Pause') {
        if (state.status === 'playing') dispatch({ type: 'PAUSE' })
        else if (state.status === 'paused') dispatch({ type: 'RESUME' })
        return
      }

      if (state.status !== 'playing') return

      const digit = parseInt(e.key, 10)
      if (isNaN(digit) || digit < 0 || digit > 9) return

      // Find the oldest non-exploding bomb matching the pressed digit
      const match = [...state.bombs]
        .filter((b) => !b.exploding)
        .sort((a, b) => a.spawnedAt - b.spawnedAt)
        .find((b) => b.digit === digit)

      if (match) {
        dispatch({ type: 'EXPLODE_BOMB', id: match.id })
      } else {
        dispatch({ type: 'WRONG_KEY' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [state.status, state.bombs, dispatch])
}
