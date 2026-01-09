'use client'

import Loading from '@/components/loading'
import NotFoundComponent from '@/components/not-found-component'
import { useJoin } from '@/features/join/api/use-join'
import JoinScreen from '@/features/join/components/join-screen'
import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { toast } from 'sonner'

const JoinPage = () => {
  const workspaceId = useWorkspaceId()

  const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId })
  const { mutate, isPending } = useJoin()

  const router = useRouter()

  const isMember = useMemo(() => data?.isMember, [data?.isMember])

  useEffect(() => {
    if (isMember) {
      router.push(`/workspace/${workspaceId}`)
    }
  }, [isMember, router, workspaceId])

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
      }
    )
  }

  if (isLoading) {
    return <Loading />
  }

  if (!data) return <NotFoundComponent label='Workspace not found' />

  return <JoinScreen handleComplete={handleComplete} loading={isPending} workspaceName={data.name} />
}

export default JoinPage
