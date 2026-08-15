'use client'

import { useState } from 'react'
import { useGameEngine } from '@/hooks/useGameEngine'
import { GameBoard } from '@/components/game/GameBoard'
import { StartModal } from '@/components/modals/StartModal'
import { GameOverModal } from '@/components/modals/GameOverModal'
import { LeaderboardModal } from '@/components/modals/LeaderboardModal'
import { PhaseUpModal } from '@/components/modals/PhaseUpModal'

type Screen = 'game' | 'leaderboard'

export default function GamePage() {
  const { state, dispatch, start, restart, pause, resume, phaseUpContinue } = useGameEngine()
  const [screen, setScreen] = useState<Screen>('game')

  const isIdle = state.status === 'idle'
  const isGameOver = state.status === 'gameover'
  const isPaused = state.status === 'paused'
  const isPhaseUp = state.status === 'phaseup'

  return (
    <main
      className="relative w-full h-screen bg-[#0a0a14] overflow-hidden"
      style={{ '--board-height': '100vh' } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <GameBoard
        score={state.score}
        level={state.level}
        phase={state.phase}
        lives={state.lives}
        bombs={state.bombs}
        isFlashing={state.isFlashing}
        isPaused={isPaused}
        dispatch={dispatch}
      />

      {isIdle && <StartModal onStart={start} />}

      {isPhaseUp && (
        <PhaseUpModal
          phase={state.phase}
          score={state.score}
          onContinue={phaseUpContinue}
        />
      )}

      {isGameOver && screen === 'game' && (
        <GameOverModal
          score={state.score}
          onRestart={restart}
          onViewLeaderboard={() => setScreen('leaderboard')}
        />
      )}

      {screen === 'leaderboard' && (
        <LeaderboardModal
          currentScore={isGameOver ? state.score : undefined}
          onClose={() => {
            setScreen('game')
            if (isGameOver) restart()
          }}
        />
      )}
    </main>
  )
}
