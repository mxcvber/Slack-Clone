import { useQuery } from 'convex/react'
import { Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'

interface UseGetMessageProps {
  id: Id<'messages'> | null
}

export const useGetMessage = ({ id }: UseGetMessageProps) => {
  const data = useQuery(api.messages.getById, id ? { id } : 'skip')

  const isLoading = id !== null && data === undefined

  return { data, isLoading }
}
