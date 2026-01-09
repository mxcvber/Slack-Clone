import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'

interface UseGetWorkspaceInfoProps {
  id: Id<'workspaces'> | null
}

export const useGetWorkspaceInfo = ({ id }: UseGetWorkspaceInfoProps) => {
  const data = useQuery(api.workspaces.getInfoById, id ? { id } : 'skip')

  const isLoading = id !== null && data === undefined

  return { data, isLoading }
}
