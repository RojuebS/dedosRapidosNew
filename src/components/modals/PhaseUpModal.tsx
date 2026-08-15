import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

interface PhaseUpModalProps {
  phase: number
  score: number
  onContinue: () => void
}

export function PhaseUpModal({ phase, score, onContinue }: PhaseUpModalProps) {
  return (
    <Modal>
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <p className="text-purple-400 text-sm font-bold uppercase tracking-widest">
            Fase concluída!
          </p>
          <p className="text-7xl font-black text-white">
            {phase - 1}
            <span className="text-purple-400"> → </span>
            {phase}
          </p>
          <p className="text-gray-400 text-sm">
            As bombas vão cair mais rápido. Boa sorte!
          </p>
        </div>

        <div className="bg-white/5 rounded-xl px-6 py-3 inline-block">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Pontuação</p>
          <p className="text-2xl font-black text-yellow-400 tabular-nums">{score}</p>
        </div>

        <Button onClick={onContinue} className="w-full text-lg py-4">
          Continuar 🚀
        </Button>
      </div>
    </Modal>
  )
}
