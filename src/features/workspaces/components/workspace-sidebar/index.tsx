import WorkspaceHeader from './workspace-header'
import SidebarItem from './sidebar-item'
import WorkspaceSection from './workspace-section'
import MemberItem from './member-item'
import NotFoundComponent from '@/components/not-found-component'
import { Id } from '../../../../../convex/_generated/dataModel'
import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server'
import { fetchQuery } from 'convex/nextjs'
import { api } from '../../../../../convex/_generated/api'

const WorkspaceSidebar = async ({ workspaceId }: { workspaceId: Id<'workspaces'> }) => {
  const token = await convexAuthNextjsToken()

  const [memberData, workspaceData, channelsData, membersData] = await Promise.all([
    fetchQuery(api.members.current, { workspaceId }, { token }),
    fetchQuery(api.workspaces.getById, { id: workspaceId }, { token }),
    fetchQuery(api.channels.get, { workspaceId }, { token }),
    fetchQuery(api.members.get, { workspaceId }, { token }),
  ])

  if (!memberData || !workspaceData) {
    return <NotFoundComponent className='text-white' label='Workspace not found' />
  }

  const isAdmin = memberData.role === 'admin'

  return (
    <div className='flex flex-col h-full'>
      <WorkspaceHeader workspace={workspaceData} isAdmin={isAdmin} />

      <div className='flex flex-col px-0 sm:px-2 mt-3'>
        <SidebarItem label='Threads' iconKey='threads' id='threads' />
        <SidebarItem label='Drafts & Sent' iconKey='drafts' id='drafts' />
      </div>

      <WorkspaceSection label='Channels' hint='New channel' isAdmin={isAdmin}>
        {channelsData?.map((item) => (
          <SidebarItem key={item._id} iconKey='channel' label={item.name} id={item._id} />
        ))}
      </WorkspaceSection>

      <WorkspaceSection label='Direct Messages' hint='New direct message'>
        {membersData?.map((item) => (
          <MemberItem key={item._id} id={item._id} label={item.user.name} image={item.user.image} />
        ))}
      </WorkspaceSection>
    </div>
  )
}

export default WorkspaceSidebar
