import { useParams } from 'next/navigation'
import { isConvexId } from '@/lib/utils'

export const useMemberId = () => {
  const params = useParams()

  const id = params.memberId
  const workspaceId = params.workspaceId

  if (!isConvexId<'members'>(id) || !isConvexId<'workspaces'>(workspaceId)) {
    return null
  }

  return id
}
