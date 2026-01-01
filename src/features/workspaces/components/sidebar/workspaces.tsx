import { useRouter } from 'next/navigation'
import { useGetWorkspaces } from '../../api/use-get-workspaces'
import { useWorkspaceId } from '../../hooks/use-workspace-id'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

const Workspaces = () => {
  const workspaceId = useWorkspaceId()
  const { data } = useGetWorkspaces()

  const router = useRouter()

  const filteredWorkspaces = data?.filter((workspace) => workspace?._id !== workspaceId)

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
