import { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  className?: string
}

export function Modal({ children, className = '' }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className={`relative z-10 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 animate-fade-in ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
