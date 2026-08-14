interface HeartProps {
  filled: boolean
}

export function Heart({ filled }: HeartProps) {
  return (
    <span
      className={`text-2xl transition-all duration-300 ${filled ? 'opacity-100 scale-100' : 'opacity-30 scale-90 grayscale'}`}
      aria-hidden="true"
    >
      ❤️
    </span>
  )
}
