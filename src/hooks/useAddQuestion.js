import { useDispatch } from 'react-redux'
import { addQuestion } from '../store/questionsSlice'

export function useAddQuestion() {
  const dispatch = useDispatch()

  return {
    mutate: (questionData, { onSuccess } = {}) => {
      dispatch(addQuestion(questionData)).unwrap().then(() => {
        if (onSuccess) onSuccess()
      })
    },
  }
}
