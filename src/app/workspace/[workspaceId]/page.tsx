import React from 'react'

interface WorkspaceIdPageProps {
  params: {
    workspaceId: string
  }
}

const WorkspaceIdPage: React.FC<WorkspaceIdPageProps> = async ({ params }) => {
  const { workspaceId } = await params

  return <div>WorkspaceIdPage ID: {workspaceId} </div>
}

export default WorkspaceIdPage
