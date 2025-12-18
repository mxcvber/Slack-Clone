import { useCurrentMember } from '@/features/members/api/use-current-member'
import { useWorkspaceId } from '../../hooks/use-workspace-id'
import { useGetWorkspace } from '../../api/use-get-workspace'
import { AlertTriangle, Loader } from 'lucide-react'
import WorkspaceHeader from './workspace-header'

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId()
  const { data: memberData, isLoading: memberLoading } = useCurrentMember({ workspaceId })
  const { data: workspaceData, isLoading: workspaceLoading } = useGetWorkspace({ workspaceId })

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
    </div>
  )
}

export default WorkspaceSidebar
