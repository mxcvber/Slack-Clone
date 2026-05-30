'use client'

import { useRouter } from 'next/navigation'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Doc } from '../../../../../convex/_generated/dataModel'

interface WorkspacesProps {
  workspaceId: string
  workspaces: Doc<'workspaces'>[]
}

const Workspaces: React.FC<WorkspacesProps> = ({ workspaceId, workspaces }) => {
  const router = useRouter()

  const filteredWorkspaces = workspaces?.filter((workspace) => workspace?._id !== workspaceId)

  return filteredWorkspaces?.map((workspace) => (
    <DropdownMenuItem
      key={workspace._id}
      className='cursor-pointer capitalize overflow-hidden'
      onClick={() => router.push(`/workspace/${workspace._id}`)}
    >
      <div className='shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2'>
        {workspace.name.charAt(0).toUpperCase()}
      </div>

      <span className='truncate'>{workspace.name}</span>
    </DropdownMenuItem>
  ))
}

export default Workspaces
