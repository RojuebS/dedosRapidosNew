import { memo } from 'react'
import { GAME_CONFIG } from '@/constants/game'

interface ScoreDisplayProps {
  score: number
  level: number
  phase: number
}

export const ScoreDisplay = memo(function ScoreDisplay({ score, level, phase }: ScoreDisplayProps) {
  const progress = ((score % GAME_CONFIG.POINTS_PER_PHASE) / GAME_CONFIG.POINTS_PER_PHASE) * 100

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Score</div>
      <div className="text-4xl font-black text-white tabular-nums leading-none">{score}</div>
      <div className="flex items-center gap-2">
        <div className="text-xs text-yellow-400 font-semibold">Nível {level}</div>
        <div className="text-xs text-gray-600">·</div>
        <div className="text-xs text-purple-400 font-semibold">Fase {phase}</div>
      </div>
      <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden mt-0.5">
        <div
          className="h-full bg-purple-400 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
})
