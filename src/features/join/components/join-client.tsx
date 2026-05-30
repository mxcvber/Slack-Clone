'use client'

import { useRouter } from 'next/navigation'
import { Id } from '../../../../convex/_generated/dataModel'
import { useJoin } from '../api/use-join'
import JoinScreen from './join-screen'
import { toast } from 'sonner'

interface JoinClientProps {
  workspaceId: Id<'workspaces'>
  workspaceName: string
}

const JoinClient: React.FC<JoinClientProps> = ({ workspaceId, workspaceName }) => {
  const { mutate, isPending } = useJoin()
  const router = useRouter()

  const handleComplete = (value: string) => {
    if (!workspaceId) return

    mutate(
      { workspaceId, joinCode: value },
      {
        onSuccess: (id) => {
          router.replace(`/workspace/${id}`)
          toast.success('Workspace joined')
        },
        onError: () => {
          toast.error('Failed to join workspace')
        },
      },
    )
  }

  return <JoinScreen handleComplete={handleComplete} loading={isPending} workspaceName={workspaceName} />
}

export default JoinClient
