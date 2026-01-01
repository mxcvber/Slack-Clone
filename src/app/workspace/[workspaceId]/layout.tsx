import Toolbar from '@/features/workspaces/components/toolbar'
import Sidebar from '../../../features/workspaces/components/sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import WorkspaceSidebar from '@/features/workspaces/components/workspace-sidebar'

const WorkspaceLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='h-full'>
      <Toolbar />
      <div className='flex h-[calc(100vh-40px)]'>
        <Sidebar />
        <ResizablePanelGroup direction='horizontal'>
          <ResizablePanel defaultSize={20} minSize={15} className='bg-[#5E2C5F]'>
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80} minSize={50}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

export default WorkspaceLayout
