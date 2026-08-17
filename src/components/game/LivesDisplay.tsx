import { memo } from 'react'
import { Heart } from '@/components/ui/Heart'
import { GAME_CONFIG } from '@/constants/game'

interface LivesDisplayProps {
  lives: number
}

export const LivesDisplay = memo(function LivesDisplay({ lives }: LivesDisplayProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: GAME_CONFIG.INITIAL_LIVES }, (_, i) => (
        <Heart key={i} filled={i < lives} />
      ))}
    </div>
  )
})
