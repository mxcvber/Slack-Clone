'use client'

import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId()
  const { data } = useGetWorkspace({ workspaceId })

  return <div>Data: {JSON.stringify(data)} </div>
}

export default WorkspaceIdPage
