import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'danger' | 'ghost'
}

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-6 py-3 rounded-xl font-bold text-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 shadow-lg',
        variant === 'danger' && 'bg-red-500 text-white hover:bg-red-400 shadow-lg',
        variant === 'ghost' && 'bg-white/10 text-white hover:bg-white/20 border border-white/20',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
