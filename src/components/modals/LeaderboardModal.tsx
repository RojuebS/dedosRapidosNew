'use client'

import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useLeaderboard } from '@/hooks/useScores'
import { LEADERBOARD_SIZE } from '@/constants/game'

interface LeaderboardModalProps {
  currentScore?: number
  onClose: () => void
}

export function LeaderboardModal({ currentScore, onClose }: LeaderboardModalProps) {
  const { data: entries, isLoading, isError } = useLeaderboard()

  return (
    <Modal className="max-w-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white">🏆 Top {LEADERBOARD_SIZE}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ✕ Fechar
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-8 text-gray-400 text-sm">Carregando...</div>
        )}

        {isError && (
          <div className="text-center py-8 text-red-400 text-sm">
            Erro ao carregar ranking.
          </div>
        )}

        {entries && (
          <ol className="space-y-2">
            {entries.map((entry, index) => (
              <li
                key={entry.id}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                  entry.score === currentScore
                    ? 'bg-yellow-400/20 border border-yellow-400/30'
                    : 'bg-white/5'
                }`}
              >
                <span
                  className={`text-sm font-black w-6 text-center ${
                    index === 0
                      ? 'text-yellow-400'
                      : index === 1
                        ? 'text-gray-300'
                        : index === 2
                          ? 'text-amber-600'
                          : 'text-gray-500'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="flex-1 text-sm text-white font-medium truncate">
                  {entry.nickname}
                </span>
                <span className="text-sm font-black text-yellow-400 tabular-nums">
                  {entry.score}
                </span>
              </li>
            ))}
          </ol>
        )}

        <Button onClick={onClose} className="w-full">
          Voltar
        </Button>
      </div>
    </Modal>
  )
}
