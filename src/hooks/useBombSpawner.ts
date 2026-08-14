import { useEffect, useRef } from 'react'
import { GameAction, GameState } from '@/types/game'
import { createBomb, howManyToSpawn } from '@/services/game/bombFactory'
import { computeDifficulty } from '@/services/game/difficultyEngine'

export function useBombSpawner(
  state: GameState,
  dispatch: React.Dispatch<GameAction>,
) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (state.status !== 'playing') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    const { fallDuration, spawnInterval } = computeDifficulty(state.level)

    intervalRef.current = setInterval(() => {
      const count = howManyToSpawn()
      for (let i = 0; i < count; i++) {
        dispatch({ type: 'SPAWN_BOMB', bomb: createBomb(fallDuration) })
      }
    }, spawnInterval)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [state.status, state.level, dispatch])
}
