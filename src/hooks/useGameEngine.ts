import { useGameReducer } from './useGameReducer'
import { useBombSpawner } from './useBombSpawner'
import { useKeyboardInput } from './useKeyboardInput'
import { useFlash } from './useFlash'

export function useGameEngine() {
  const [state, dispatch] = useGameReducer()

  useBombSpawner(state, dispatch)
  useKeyboardInput(state, dispatch)
  useFlash(state, dispatch)

  return {
    state,
    dispatch,
    start: () => dispatch({ type: 'START' }),
    restart: () => dispatch({ type: 'RESTART' }),
    pause: () => dispatch({ type: 'PAUSE' }),
    resume: () => dispatch({ type: 'RESUME' }),
  }
}
