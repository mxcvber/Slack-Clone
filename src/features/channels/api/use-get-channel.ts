import { useQuery } from 'convex/react'
import { Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'

interface UseGetChannelProps {
  id: Id<'channels'> | null
}

export const useGetChannel = ({ id }: UseGetChannelProps) => {
  const data = useQuery(api.channels.getById, id ? { id } : 'skip')

  const isLoading = id !== null && data === undefined

  return { data, isLoading }
}
