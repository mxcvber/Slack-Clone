'use client'

import Loading from '@/components/loading'
import JoinScreen from '@/features/join/components/join-screen'
import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info'
import { useJoin } from '@/features/workspaces/api/use-join'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { toast } from 'sonner'

const JoinPage = () => {
  const workspaceId = useWorkspaceId()

  const { data, isLoading } = useGetWorkspaceInfo({ workspaceId })
  const { mutate, isPending } = useJoin()

  const router = useRouter()

  const isMember = useMemo(() => data?.isMember, [data?.isMember])

  useEffect(() => {
    if (isMember) {
      router.push(`/workspace/${workspaceId}`)
    }
  }, [isMember, router, workspaceId])

  const handleComplete = (value: string) => {
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
      }
    )
  }

  if (isLoading) {
    return <Loading />
  }

  if (!data) return

  return <JoinScreen handleComplete={handleComplete} loading={isPending} workspaceName={data.name} />
}

export default JoinPage
