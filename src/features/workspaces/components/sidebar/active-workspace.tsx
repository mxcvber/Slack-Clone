import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'

interface ActiveWorkspaceProps {
  workspaceId: string
  workspaceName: string | undefined
}

const ActiveWorkspace: React.FC<ActiveWorkspaceProps> = ({ workspaceId, workspaceName }) => {
  const router = useRouter()

  return (
    <DropdownMenuItem
      onClick={() => router.push(`/workspace/${workspaceId}`)}
      className='cursor-pointer flex-col justify-start items-start capitalize'
    >
      {workspaceName}
      <span className='text-xs text-muted-foreground'>Active workspace</span>
    </DropdownMenuItem>
  )
}

export default ActiveWorkspace
