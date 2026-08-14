export interface ScoreEntry {
  id: number
  nickname: string
  score: number
  createdAt: string
}

export interface SubmitScorePayload {
  nickname: string
  score: number
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}
