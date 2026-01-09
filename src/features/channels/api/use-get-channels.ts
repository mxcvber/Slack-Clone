import { useQuery } from 'convex/react'
import { Id } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'

interface UseGetChannelsProps {
  workspaceId: Id<'workspaces'> | null
}

export const useGetChannels = ({ workspaceId }: UseGetChannelsProps) => {
  const data = useQuery(api.channels.get, workspaceId ? { workspaceId } : 'skip')

  const isLoading = workspaceId !== null && data === undefined

  return { data, isLoading }
}
