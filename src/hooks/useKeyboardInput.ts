import { useEffect, useRef } from 'react'
import { GameAction, GameState } from '@/types/game'

export function useKeyboardInput(
  state: GameState,
  dispatch: React.Dispatch<GameAction>,
) {
  const stateRef = useRef(state)
  stateRef.current = state

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const { status, bombs } = stateRef.current

      if (e.key === 'Escape' || e.key === 'Pause') {
        if (status === 'playing') dispatch({ type: 'PAUSE' })
        else if (status === 'paused') dispatch({ type: 'RESUME' })
        return
      }

      if (status !== 'playing') return

      const digit = parseInt(e.key, 10)
      if (isNaN(digit) || digit < 0 || digit > 9) return

      const now = Date.now()
      const match = [...bombs]
        .filter((b) => !b.exploding && now - b.spawnedAt < b.duration)
        .sort((a, b) => a.spawnedAt - b.spawnedAt)
        .find((b) => b.digit === digit)

      dispatch(match ? { type: 'EXPLODE_BOMB', id: match.id } : { type: 'WRONG_KEY' })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch])
}
