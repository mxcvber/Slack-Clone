import { isConvexId } from '@/lib/utils'
import { useParams } from 'next/navigation'

export const useWorkspaceId = () => {
  const params = useParams()

  const id = params.workspaceId

  if (!isConvexId<'workspaces'>(id)) {
    return null
  }

  return id
}
