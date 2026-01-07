'use client'

import { Button } from '@/components/ui/button'
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { Info, Search } from 'lucide-react'

const Toolbar = () => {
  const workspaceId = useWorkspaceId()
  const { data } = useGetWorkspace({ id: workspaceId })

  return (
    <header className='bg-dark-purple h-10 p-1.5'>
      <nav aria-label='Workspace navigation' className='flex items-center justify-between'>
        <div className='flex-1' />

        <div className='min-w-[280px] max-w-[642px] grow-2 shrink-0'>
          <Button size='sm' className='text-white bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2'>
            <Search className='size-4 mr-2' />
            <span className='text-xs truncate'>Search {data?.name}</span>
          </Button>
        </div>

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
