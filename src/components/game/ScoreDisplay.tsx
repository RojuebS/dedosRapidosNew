interface ScoreDisplayProps {
  score: number
  level: number
}

export function ScoreDisplay({ score, level }: ScoreDisplayProps) {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Score</div>
      <div className="text-4xl font-black text-white tabular-nums leading-none">{score}</div>
      <div className="text-xs text-yellow-400 font-semibold">Level {level}</div>
    </div>
  )
}
