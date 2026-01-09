import { useParams } from 'next/navigation'
import { isConvexId } from '@/lib/utils'

export const useChannelId = () => {
  const params = useParams()

  const id = params.channelId
  const workspaceId = params.workspaceId

  if (!isConvexId<'channels'>(id) || !isConvexId<'workspaces'>(workspaceId)) {
    return null
  }

  return id
}
