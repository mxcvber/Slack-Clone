'use client'

import Toolbar from '@/features/workspaces/components/toolbar'
import Sidebar from '../../../features/workspaces/components/sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import WorkspaceSidebar from '@/features/workspaces/components/workspace-sidebar'
import { usePanel } from '@/hooks/use-panel'
import { Id } from '../../../../convex/_generated/dataModel'
import Thread from '@/features/messages/components/thread'
import Loading from '@/components/loading'

const WorkspaceLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { parentMessageId, onClose } = usePanel()

  const showPanel = Boolean(parentMessageId)

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

          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30} minSize={20}>
                {parentMessageId ? (
                  <Thread messageId={parentMessageId as Id<'messages'>} onClose={onClose} />
                ) : (
                  <Loading />
                )}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

export default WorkspaceLayout
