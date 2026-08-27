import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/usersSlice'

export function useUsers() {
  const dispatch = useDispatch()
  const { data, status } = useSelector((state) => state.users)

  useEffect(() => {
    if (status === 'idle' && Object.keys(data).length === 0) {
      dispatch(fetchUsers())
    }
  }, [dispatch, status, data])

  return {
    data,
    isLoading: status === 'loading' || (status === 'idle' && Object.keys(data).length === 0),
    isError: status === 'failed',
  }
}
