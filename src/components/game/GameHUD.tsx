import { ScoreDisplay } from './ScoreDisplay'
import { LivesDisplay } from './LivesDisplay'

interface GameHUDProps {
  score: number
  level: number
  lives: number
  paused: boolean
  onPause: () => void
  onResume: () => void
}

export function GameHUD({ score, level, lives, paused, onPause, onResume }: GameHUDProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
      <ScoreDisplay score={score} level={level} />
      {/* <button
        onClick={paused ? onResume : onPause}
        className="text-white/60 hover:text-white text-sm font-medium transition-colors px-3 py-1 rounded-lg hover:bg-white/10"
        aria-label={paused ? 'Resume game' : 'Pause game'}
      >
        {paused ? '▶ Resume' : '⏸ Pause'}
      </button> */}
      <LivesDisplay lives={lives} />
    </div>
  )
}
