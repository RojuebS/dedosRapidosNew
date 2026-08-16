import { useEffect, useRef } from 'react'
import { GameAction, GameState } from '@/types/game'
import { createBomb } from '@/services/game/bombFactory'
import { computeDifficulty, computeMaxBombs } from '@/services/game/difficultyEngine'

export function useBombSpawner(
  state: GameState,
  dispatch: React.Dispatch<GameAction>,
) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // Keep a live ref so the interval callback reads current bombs/level
  // without needing to be in the effect deps (which would restart the interval on every bomb change)
  const stateRef = useRef(state)
  stateRef.current = state

  useEffect(() => {
    if (state.status !== 'playing') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    const { fallDuration, spawnInterval } = computeDifficulty(state.phase)

    intervalRef.current = setInterval(() => {
      const { bombs, level } = stateRef.current
      const activeBombs = bombs.filter((b) => !b.exploding).length
      const maxBombs = computeMaxBombs(level)

      if (activeBombs < maxBombs) {
        dispatch({ type: 'SPAWN_BOMB', bomb: createBomb(fallDuration) })
      }
    }, spawnInterval)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [state.status, state.phase, dispatch])
}
