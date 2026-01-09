'use client'

import { useCurrentMember } from '@/features/members/api/use-current-member'
import { useWorkspaceId } from '../../hooks/use-workspace-id'
import { useGetWorkspace } from '../../api/use-get-workspace'
import { HashIcon, MessageSquareText, SendHorizonal } from 'lucide-react'
import WorkspaceHeader from './workspace-header'
import SidebarItem from './sidebar-item'
import { useGetChannels } from '@/features/channels/api/use-get-channels'
import WorkspaceSection from './workspace-section'
import { useGetMembers } from '@/features/members/api/use-get-members'
import MemberItem from './member-item'
import { useCreateChannelModal } from '@/features/channels/store/use-create-channel-modal'
import { useChannelId } from '@/features/channels/hooks/use-channel-id'
import NotFoundComponent from '@/components/not-found-component'
import Loading from '@/components/loading'

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId()
  const channelId = useChannelId()
  const { setOpen } = useCreateChannelModal()

  const { data: memberData, isLoading: memberLoading } = useCurrentMember({ workspaceId })
  const { data: workspaceData, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId })
  const { data: channelsData, isLoading: channelsLoading } = useGetChannels({ workspaceId })
  const { data: membersData, isLoading: membersLoading } = useGetMembers({ workspaceId })

  const loading = memberLoading || workspaceLoading || channelsLoading || membersLoading

  if (loading) {
    return <Loading className='text-white' />
  }

  if (!memberData || !workspaceData) {
    return <NotFoundComponent className='text-white' label='Workspace not found' />
  }

  return (
    <div className='flex flex-col h-full'>
      <WorkspaceHeader workspace={workspaceData} isAdmin={memberData.role === 'admin'} />

      <div className='flex flex-col px-2 mt-3'>
        <SidebarItem label='Threads' icon={MessageSquareText} id='threads' />
        <SidebarItem label='Drafts & Sent' icon={SendHorizonal} id='drafts' />
      </div>

      <WorkspaceSection
        label='Channels'
        hint='New channel'
        onNew={memberData.role === 'admin' ? () => setOpen(true) : undefined}
      >
        {channelsData?.map((item) => (
          <SidebarItem
            variant={channelId === item._id ? 'active' : 'default'}
            key={item._id}
            icon={HashIcon}
            label={item.name}
            id={item._id}
          />
        ))}
      </WorkspaceSection>

      <WorkspaceSection label='Direct Messages' hint='New direct message' onNew={() => {}}>
        {membersData?.map((item) => (
          <MemberItem key={item._id} id={item._id} label={item.user.name} image={item.user.image} />
        ))}
      </WorkspaceSection>
    </div>
  )
}

export default WorkspaceSidebar
