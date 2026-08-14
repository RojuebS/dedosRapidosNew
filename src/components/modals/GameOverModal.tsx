'use client'

import { useState, FormEvent } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useSubmitScore } from '@/hooks/useScores'

interface GameOverModalProps {
  score: number
  onRestart: () => void
  onViewLeaderboard: () => void
}

export function GameOverModal({ score, onRestart, onViewLeaderboard }: GameOverModalProps) {
  const [nickname, setNickname] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const { mutate: submitScore, isPending, isError, error } = useSubmitScore(() => {
    setSubmitted(true)
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!nickname.trim()) return
    submitScore({ nickname: nickname.trim(), score })
  }

  return (
    <Modal>
      <div className="text-center space-y-6">
        <div className="space-y-1">
          <p className="text-red-400 text-sm font-semibold uppercase tracking-widest">Game Over</p>
          <p className="text-5xl font-black text-white">{score}</p>
          <p className="text-gray-400 text-sm">pontos</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1 text-left">
              <label htmlFor="nickname" className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Seu apelido
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={30}
                placeholder="Digite seu apelido..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                autoFocus
              />
            </div>

            {isError && (
              <p className="text-red-400 text-xs">{(error as Error)?.message}</p>
            )}

            <Button type="submit" className="w-full" disabled={!nickname.trim() || isPending}>
              {isPending ? 'Enviando...' : 'Salvar pontuação'}
            </Button>
          </form>
        ) : (
          <div className="py-2">
            <p className="text-green-400 font-semibold">✓ Pontuação salva!</p>
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="ghost" onClick={onViewLeaderboard} className="flex-1">
            🏆 Ranking
          </Button>
          <Button onClick={onRestart} className="flex-1">
            Jogar de novo
          </Button>
        </div>
      </div>
    </Modal>
  )
}
