import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import ActiveWorkspace from './active-workspace'
import Workspaces from './workspaces'
import CreateWorkspace from './create-workspace'
import { api } from '../../../../../convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'
import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server'
import { Id } from '../../../../../convex/_generated/dataModel'

const WorkspaceSwitcher = async ({ workspaceId }: { workspaceId: Id<'workspaces'> }) => {
  const token = await convexAuthNextjsToken()

  const workspace = await fetchQuery(api.workspaces.getById, { id: workspaceId }, { token })
  const workspaces = await fetchQuery(api.workspaces.get, {}, { token })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='size-7 max-sm:px-1 sm:size-9 overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-base sm:text-xl'>
          {workspace?.name.charAt(0).toUpperCase()}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side='bottom' align='start' className='w-64'>
        <ActiveWorkspace name={workspace?.name} />
        <Workspaces workspaceId={workspaceId} workspaces={workspaces ?? []} />
        <CreateWorkspace />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default WorkspaceSwitcher
