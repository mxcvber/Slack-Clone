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
  params: Promise<{ workspaceId: string }>
}>) => {
  const { workspaceId } = await params

  return (
    <div className='h-full'>
      <Toolbar workspaceId={workspaceId as Id<'workspaces'>} />
      <div className='flex h-[calc(100vh-35px)] sm:h-[calc(100vh-40px)]'>
        <Sidebar workspaceId={workspaceId as Id<'workspaces'>} />

        <ResizablePanelWrapper
          loading={<Loading />}
          workspaceSidebar={<WorkspaceSidebar workspaceId={workspaceId as Id<'workspaces'>} />}
        >
          {children}
        </ResizablePanelWrapper>
      </div>
    </div>
  )
}

export default WorkspaceLayout
