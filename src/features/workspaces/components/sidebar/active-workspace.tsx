import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

interface ActiveWorkspaceProps {
  name: string | undefined
}

const ActiveWorkspace: React.FC<ActiveWorkspaceProps> = ({ name }) => {
  return (
    <DropdownMenuItem className='flex-col justify-start items-start capitalize'>
      <span className='truncate w-full'>{name}</span>
      <span className='text-xs text-muted-foreground'>Active workspace</span>
    </DropdownMenuItem>
  )
}

export default ActiveWorkspace
