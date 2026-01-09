import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'

interface UseGetMembersProps {
  workspaceId: Id<'workspaces'> | null
}

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  const data = useQuery(api.members.get, workspaceId ? { workspaceId } : 'skip')

  const isLoading = workspaceId !== null && data === undefined

  return { data, isLoading }
}
