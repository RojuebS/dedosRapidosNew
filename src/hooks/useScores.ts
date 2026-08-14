import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { scoresService } from '@/services/scores/scoresService'
import { SubmitScorePayload } from '@/types/api'

const QUERY_KEY = ['leaderboard'] as const

export function useLeaderboard() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: scoresService.getLeaderboard,
    staleTime: 30_000,
  })
}

export function useSubmitScore(onSuccess?: () => void) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: SubmitScorePayload) => scoresService.submitScore(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      onSuccess?.()
    },
  })
}
