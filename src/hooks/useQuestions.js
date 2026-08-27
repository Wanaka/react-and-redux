import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuestions } from '../store/questionsSlice'

export function useQuestions() {
  const dispatch = useDispatch()
  const { data, status } = useSelector((state) => state.questions)

  useEffect(() => {
    if (status === 'idle' && Object.keys(data).length === 0) {
      dispatch(fetchQuestions())
    }
  }, [dispatch, status, data])

  return {
    data,
    isLoading: status === 'loading' || (status === 'idle' && Object.keys(data).length === 0),
    isError: status === 'failed',
  }
}
