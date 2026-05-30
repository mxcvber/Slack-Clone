import Toolbar from '@/features/workspaces/components/toolbar'
import Sidebar from '../../../features/workspaces/components/sidebar'
import WorkspaceSidebar from '@/features/workspaces/components/workspace-sidebar'
import Loading from '@/components/loading'
import ResizablePanelWrapper from '@/features/workspaces/components/resizable-panel-wrapper'
import { Id } from '../../../../convex/_generated/dataModel'

const WorkspaceLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ workspaceId: Id<'workspaces'> }>
}>) => {
  const { workspaceId } = await params

  return (
    <div className='h-full'>
      <Toolbar workspaceId={workspaceId} />
      <div className='flex h-[calc(100vh-35px)] sm:h-[calc(100vh-40px)]'>
        <Sidebar workspaceId={workspaceId} />

        <ResizablePanelWrapper loading={<Loading />} workspaceSidebar={<WorkspaceSidebar workspaceId={workspaceId} />}>
          {children}
        </ResizablePanelWrapper>
      </div>
    </div>
  )
}

export default WorkspaceLayout
