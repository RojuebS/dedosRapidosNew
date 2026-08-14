import { useEffect } from 'react'
import { GameAction, GameState } from '@/types/game'
import { GAME_CONFIG } from '@/constants/game'

export function useFlash(state: GameState, dispatch: React.Dispatch<GameAction>) {
  useEffect(() => {
    if (!state.isFlashing) return
    const timer = setTimeout(
      () => dispatch({ type: 'FLASH_END' }),
      GAME_CONFIG.FLASH_DURATION_MS,
    )
    return () => clearTimeout(timer)
  }, [state.isFlashing, dispatch])
}
