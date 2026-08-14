import { ScoreEntry, SubmitScorePayload } from '@/types/api'
import httpClient from '@/services/http/client'

export const scoresService = {
  async getLeaderboard(): Promise<ScoreEntry[]> {
    const { data } = await httpClient.get<ScoreEntry[]>('/scores')
    return data
  },

  async submitScore(payload: SubmitScorePayload): Promise<ScoreEntry> {
    const { data } = await httpClient.post<ScoreEntry>('/scores', payload)
    return data
  },
}
