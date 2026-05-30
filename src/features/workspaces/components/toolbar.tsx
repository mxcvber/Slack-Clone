import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'
import { Id } from '../../../../convex/_generated/dataModel'
import ToolbarSearch from './toolbar-search'
import { fetchQuery } from 'convex/nextjs'
import { api } from '../../../../convex/_generated/api'
import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server'

const Toolbar = async ({ workspaceId }: { workspaceId: Id<'workspaces'> }) => {
  const token = await convexAuthNextjsToken()

  const [workspace, channels, members] = await Promise.all([
    fetchQuery(api.workspaces.getById, { id: workspaceId }, { token }),
    fetchQuery(api.channels.get, { workspaceId }, { token }),
    fetchQuery(api.members.get, { workspaceId }, { token }),
  ])

  return (
    <header className='bg-dark-purple h-[35px] sm:h-10 p-1.5'>
      <nav aria-label='Workspace navigation' className='flex items-center justify-between w-full '>
        <div className='flex-1' />

        <ToolbarSearch
          workspaceId={workspaceId}
          workspaceName={workspace?.name}
          channels={channels ?? []}
          members={members ?? []}
        />

        <div className='flex flex-1 items-center justify-end'>
          <Button variant='transparent' size='icon-sm'>
            <Info className='size-5 text-white' />
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Toolbar
