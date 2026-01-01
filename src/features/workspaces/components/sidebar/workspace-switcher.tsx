import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { Loader } from 'lucide-react'
import ActiveWorkspace from './active-workspace'
import Workspaces from './workspaces'
import CreateWorkspace from './create-workspace'

const WorkspaceSwitcher = () => {
  const workspaceId = useWorkspaceId()
  const { data, isLoading } = useGetWorkspace({ id: workspaceId })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='size-9 overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl'>
          {isLoading ? <Loader className='size-5 animate-spin shrink-0' /> : data?.name.charAt(0).toUpperCase()}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side='bottom' align='start' className='w-64'>
        <ActiveWorkspace id={workspaceId} name={data?.name} />
        <Workspaces />
        <CreateWorkspace />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default WorkspaceSwitcher
