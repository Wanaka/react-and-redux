import { useDispatch } from 'react-redux'
import { voteOnQuestion } from '../store/questionsSlice'

export function useVote() {
  const dispatch = useDispatch()

  return {
    mutate: (voteData) => dispatch(voteOnQuestion(voteData)),
  }
}
