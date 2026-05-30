'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import React from 'react'
import Thread from '@/features/messages/components/thread'
import Profile from '@/features/members/components/profile'
import { cn } from '@/lib/utils'
import { usePanel } from '@/hooks/use-panel'
import { useWindowSize } from 'react-use'
import { Id } from '../../../../convex/_generated/dataModel'

const ResizablePanelWrapper = ({
  children,
  workspaceSidebar,
  loading,
}: Readonly<{
  children: React.ReactNode
  workspaceSidebar: React.ReactNode
  loading: React.ReactNode
}>) => {
  // const panelRef = useRef<ImperativePanelHandle>(null)
  const { parentMessageId, profileMemberId, onClose } = usePanel()
  const { width } = useWindowSize()
  const isMobile = width < 1024

  const showPanel = Boolean(parentMessageId) || Boolean(profileMemberId)

  // useEffect(() => {
  //   const panel = panelRef.current
  //   if (!panel) return

  //   if (showPanel) {
  //     panel.expand()
  //   } else {
  //     panel.collapse()
  //   }
  // }, [showPanel])
  return (
    <ResizablePanelGroup direction='horizontal' id='workspace-layout'>
      <ResizablePanel
        id='sidebar-panel'
        order={1}
        defaultSize={20}
        minSize={isMobile ? 0 : 15}
        className='bg-[#5E2C5F]'
      >
        {workspaceSidebar}
      </ResizablePanel>
      <ResizableHandle id='handle-1' withHandle />

      <ResizablePanel
        id='main-panel'
        order={2}
        className={cn(showPanel && 'hidden lg:block')}
        defaultSize={showPanel && isMobile ? 0 : showPanel && !isMobile ? 50 : 80}
        minSize={showPanel && isMobile ? 0 : 50}
      >
        {children}
      </ResizablePanel>

      <ResizableHandle id='handle-2' withHandle className={cn(!showPanel && 'hidden')} />
      <ResizablePanel
        id='thread-profile-panel'
        order={3}
        // ref={panelRef}
        // collapsible
        // collapsedSize={1}
        defaultSize={isMobile && showPanel ? 80 : !isMobile && showPanel ? 30 : 0}
        minSize={isMobile && !showPanel ? 0 : isMobile && showPanel ? 50 : !isMobile && !showPanel ? 0 : 30}
        className={cn(!showPanel && 'hidden')}
      >
        {parentMessageId ? (
          <Thread messageId={parentMessageId as Id<'messages'>} onClose={onClose} />
        ) : profileMemberId ? (
          <Profile memberId={profileMemberId as Id<'members'>} onClose={onClose} />
        ) : (
          loading
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ResizablePanelWrapper
