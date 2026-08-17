'use client'

import { memo, useCallback, useRef } from 'react'
import { Bomb as BombType } from '@/types/game'

interface BombProps {
  bomb: BombType
  onMissed: (id: string) => void
  onExploded: (id: string) => void
}

export const Bomb = memo(function Bomb({ bomb, onMissed, onExploded }: BombProps) {
  const handledRef = useRef(false)

  const handleAnimationEnd = useCallback(() => {
    if (handledRef.current) return
    handledRef.current = true
    if (bomb.exploding) {
      onExploded(bomb.id)
    } else {
      onMissed(bomb.id)
    }
  }, [bomb.exploding, bomb.id, onExploded, onMissed])

  return (
    <div
      className="absolute select-none pointer-events-none"
      style={{
        left: `${bomb.x}%`,
        top: 0,
        animation: bomb.exploding
          ? 'explode 400ms ease-out forwards'
          : `fall ${bomb.duration}ms linear forwards`,
      }}
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
