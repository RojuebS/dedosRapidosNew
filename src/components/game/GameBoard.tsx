'use client'

import { useCallback } from 'react'
import { Bomb as BombType, GameAction } from '@/types/game'
import { Bomb } from './Bomb'
import { GameHUD } from './GameHUD'

interface GameBoardProps {
  score: number
  level: number
  phase: number
  lives: number
  bombs: BombType[]
  isFlashing: boolean
  isPaused: boolean
  dispatch: React.Dispatch<GameAction>
}

export function GameBoard({
  score,
  level,
  phase,
  lives,
  bombs,
  isFlashing,
  isPaused,
  dispatch,
}: GameBoardProps) {
  const handleBombMissed = useCallback(
    (id: string) => dispatch({ type: 'BOMB_MISSED', id }),
    [dispatch],
  )

  const handleBombExploded = useCallback(
    (id: string) => dispatch({ type: 'REMOVE_BOMB', id }),
    [dispatch],
  )

  return (
    <div
      className={`relative w-full h-full overflow-hidden transition-colors duration-100 ${
        isFlashing ? 'bg-red-900/40' : ''
      }`}
    >
      <GameHUD score={score} level={level} phase={phase} lives={lives} />

      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50 backdrop-blur-sm">
          <p className="text-white text-4xl font-black tracking-widest">PAUSED</p>
        </div>
      )}

      {bombs.map((bomb) => (
        <Bomb
          key={bomb.id}
          bomb={bomb}
          onMissed={handleBombMissed}
          onExploded={handleBombExploded}
        />
      ))}

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-red-900/30 to-transparent pointer-events-none" />
    </div>
  )
}
