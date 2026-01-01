import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'

interface ActiveWorkspaceProps {
  id: string
  name: string | undefined
}

const ActiveWorkspace: React.FC<ActiveWorkspaceProps> = ({ id, name }) => {
  const router = useRouter()

  return (
    <DropdownMenuItem
      onClick={() => router.push(`/workspace/${id}`)}
      className='cursor-pointer flex-col justify-start items-start capitalize'
    >
      <span className='truncate w-full'>{name}</span>
      <span className='text-xs text-muted-foreground'>Active workspace</span>
    </DropdownMenuItem>
  )
}

export default ActiveWorkspace
