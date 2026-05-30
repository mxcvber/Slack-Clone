import NotFoundComponent from '@/components/not-found-component'
import { Id } from '../../../../convex/_generated/dataModel'
import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server'
import { fetchQuery } from 'convex/nextjs'
import { api } from '../../../../convex/_generated/api'
import { redirect } from 'next/navigation'
import CreateChannelModal from '@/features/channels/components/modals/create-channel-modal'

const WorkspaceIdPage = async ({ params }: { params: Promise<{ workspaceId: string }> }) => {
  const { workspaceId } = await params
  const token = await convexAuthNextjsToken()

  const [workspace, channels, member] = await Promise.all([
    fetchQuery(api.workspaces.getById, { id: workspaceId as Id<'workspaces'> }, { token }),
    fetchQuery(api.channels.get, { workspaceId: workspaceId as Id<'workspaces'> }, { token }),
    fetchQuery(api.members.current, { workspaceId: workspaceId as Id<'workspaces'> }, { token }),
  ])

  if (!workspace || !member) {
    return <NotFoundComponent label='Workspace not found' />
  }

  if (channels?.[0]?._id) {
    redirect(`/workspace/${workspaceId}/channel/${channels[0]._id}`)
  }

  if (member.role === 'admin') {
    return <CreateChannelModal forceOpen />
  }

  return <NotFoundComponent label='No channel found' />
}

export default WorkspaceIdPage
