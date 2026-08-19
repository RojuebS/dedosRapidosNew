'use client'

import { memo, useCallback, useRef } from 'react'
import { Bomb as BombType } from '@/types/game'

interface BombProps {
  bomb: BombType
  isPaused: boolean
  onMissed: (id: string) => void
  onExploded: (id: string) => void
}

export const Bomb = memo(function Bomb({ bomb, isPaused, onMissed, onExploded }: BombProps) {
  const handledRef = useRef(false)
  // Captured once when exploding becomes true — the Y px position at that moment
  const explodeTopRef = useRef<number | null>(null)

  if (bomb.exploding && explodeTopRef.current === null) {
    const elapsed = Date.now() - bomb.spawnedAt
    const progress = Math.min(elapsed / bomb.duration, 1)
    // fall goes from -80px to window.innerHeight (matches the CSS keyframe)
    const boardHeight = typeof window !== 'undefined' ? window.innerHeight : 800
    explodeTopRef.current = (boardHeight + 80) * progress - 80
  }

  const handleAnimationEnd = useCallback(() => {
    if (handledRef.current) return
    handledRef.current = true
    if (bomb.exploding) {
      onExploded(bomb.id)
    } else {
      onMissed(bomb.id)
    }
  }, [bomb.exploding, bomb.id, onExploded, onMissed])

  const playState = isPaused ? ('paused' as const) : ('running' as const)

  const commonStyle = {
    left: `${bomb.x}%`,
    animationFillMode: 'forwards' as const,
    animationPlayState: playState,
  }

  return (
    <div
      className="absolute select-none pointer-events-none"
      style={
        bomb.exploding && explodeTopRef.current !== null
          ? {
              ...commonStyle,
              top: explodeTopRef.current,
              animationName: 'explode',
              animationDuration: '400ms',
              animationTimingFunction: 'ease-out',
            }
          : {
              ...commonStyle,
              top: 0,
              animationName: 'fall',
              animationDuration: `${bomb.duration}ms`,
              animationTimingFunction: 'linear',
            }
      }
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className={`relative flex items-center justify-center w-14 h-14 rounded-xl border-2 shadow-lg shadow-black/50 ${
          bomb.exploding
            ? 'bg-orange-500 border-orange-300'
            : 'bg-gradient-to-br from-slate-700 to-slate-900 border-slate-600'
        }`}
      >
        <span className="text-2xl font-black text-white tabular-nums drop-shadow">
          {bomb.digit}
        </span>
        {!bomb.exploding && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent to-white/5" />
        )}
      </div>
    </div>
  )
})
