import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

interface StartModalProps {
  onStart: () => void
}

export function StartModal({ onStart }: StartModalProps) {
  return (
    <Modal>
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Dedos<span className="text-yellow-400">Rápidos</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Pressione os números antes que as bombas caiam!
          </p>
        </div>

        <div className="bg-white/5 rounded-xl p-4 text-left space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Como jogar</p>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>⌨️ Pressione as teclas numéricas <strong>(0-9)</strong></li>
            <li>💥 Destrua as bombas antes que cheguem ao fundo</li>
            <li>❤️ Você tem <strong>3 vidas</strong></li>
            <li>⏸ <strong>Esc</strong> para pausar</li>
          </ul>
        </div>

        <Button onClick={onStart} className="w-full text-xl py-4">
          Prepare-se! 🚀
        </Button>
      </div>
    </Modal>
  )
}
