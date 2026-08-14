import { NextRequest, NextResponse } from 'next/server'
import { ScoreEntry, SubmitScorePayload } from '@/types/api'

// In-memory store (replace with a real DB: Prisma + PostgreSQL, PlanetScale, etc.)
const scores: ScoreEntry[] = []
let nextId = 1

export async function GET() {
  const top15 = [...scores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 15)
  return NextResponse.json(top15)
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as SubmitScorePayload

  if (!body.nickname?.trim()) {
    return NextResponse.json({ message: 'Nickname is required' }, { status: 400 })
  }
  if (typeof body.score !== 'number' || body.score < 0) {
    return NextResponse.json({ message: 'Invalid score' }, { status: 400 })
  }

  const entry: ScoreEntry = {
    id: nextId++,
    nickname: body.nickname.trim().slice(0, 30),
    score: Math.floor(body.score),
    createdAt: new Date().toISOString(),
  }
  scores.push(entry)

  return NextResponse.json(entry, { status: 201 })
}
