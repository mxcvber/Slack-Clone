'use client'

import Toolbar from './components/toolbar'

const WorkspaceLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='h-full'>
      <Toolbar />
      {children}
    </div>
  )
}

export default WorkspaceLayout
