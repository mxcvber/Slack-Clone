'use client'

import Loading from '@/components/loading'
import NotFoundComponent from '@/components/not-found-component'
import { useGetChannels } from '@/features/channels/api/use-get-channels'
import { useCreateChannelModal } from '@/features/channels/store/use-create-channel-modal'
import { useCurrentMember } from '@/features/members/api/use-current-member'
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId()
  const { open, setOpen } = useCreateChannelModal()

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId })
  const { data: channels, isLoading: channelsLoading } = useGetChannels({ workspaceId })
  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId })

  const router = useRouter()

  const channelId = useMemo(() => channels?.[0]?._id, [channels])
  const isAdmin = useMemo(() => member?.role === 'admin', [member?.role])

  useEffect(() => {
    if (workspaceLoading || channelsLoading || memberLoading || !member || !workspace) return

    if (channelId) {
      router.replace(`/workspace/${workspaceId}/channel/${channelId}`)
    } else if (!open && isAdmin) {
      setOpen(true)
    }
  }, [
    member,
    memberLoading,
    isAdmin,
    channelId,
    workspaceId,
    channelsLoading,
    workspaceLoading,
    workspace,
    open,
    setOpen,
    router,
  ])

  if (workspaceLoading || channelsLoading || memberLoading) {
    return <Loading />
  }

  if (!workspace || !member) {
    return <NotFoundComponent label='Workspace not found' />
  }

  return <NotFoundComponent label='No channel found' />
}

export default WorkspaceIdPage
