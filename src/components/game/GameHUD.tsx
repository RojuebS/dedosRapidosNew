import { memo } from 'react'
import { ScoreDisplay } from './ScoreDisplay'
import { LivesDisplay } from './LivesDisplay'

interface GameHUDProps {
  score: number
  level: number
  phase: number
  lives: number
}

export const GameHUD = memo(function GameHUD({ score, level, phase, lives }: GameHUDProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
      <ScoreDisplay score={score} level={level} phase={phase} />
      <LivesDisplay lives={lives} />
    </div>
  )
})
