import { useCurrentMember } from '@/features/members/api/use-current-member'
import { useWorkspaceId } from '../../hooks/use-workspace-id'
import { useGetWorkspace } from '../../api/use-get-workspace'
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal } from 'lucide-react'
import WorkspaceHeader from './workspace-header'
import SidebarItem from './sidebar-item'
import { useGetChannels } from '@/features/channels/api/use-get-channels'
import WorkspaceSection from './workspace-section'
import { useGetMembers } from '@/features/members/api/use-get-members'
import MemberItem from './member-item'

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId()
  const { data: memberData, isLoading: memberLoading } = useCurrentMember({ workspaceId })
  const { data: workspaceData, isLoading: workspaceLoading } = useGetWorkspace({ workspaceId })
  const { data: channelsData, isLoading: channelsLoading } = useGetChannels({ workspaceId })
  const { data: membersData, isLoading: membersLoading } = useGetMembers({ workspaceId })

  if (memberLoading || workspaceLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Loader className='size-5 animate-spin text-white' />
      </div>
    )
  }

  if (!memberData || !workspaceData) {
    return (
      <div className='flex flex-col h-full gap-y-2 items-center justify-center'>
        <AlertTriangle className='size-5 text-white' />
        <p className='text-white text-sm'>Workspace not found</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full'>
      <WorkspaceHeader workspace={workspaceData} isAdmin={memberData.role === 'admin'} />

      <div className='flex flex-col px-2 mt-3'>
        <SidebarItem label='Threads' icon={MessageSquareText} id='threads' />
        <SidebarItem label='Drafts & Sent' icon={SendHorizonal} id='drafts' />
      </div>

      <WorkspaceSection label='Channels' hint='New channel' onNew={() => {}}>
        {channelsData?.map((item) => (
          <SidebarItem key={item._id} icon={HashIcon} label={item.name} id={item._id} />
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
