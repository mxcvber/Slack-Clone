import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { Doc } from '../../../../../../convex/_generated/dataModel'
import React, { Dispatch, SetStateAction } from 'react'

interface DropdownProps {
  workspace: Doc<'workspaces'>
  isAdmin: boolean
  setPreferencesOpen: Dispatch<SetStateAction<boolean>>
  setInviteOpen: Dispatch<SetStateAction<boolean>>
}

const Dropdown: React.FC<DropdownProps> = ({ workspace, isAdmin, setInviteOpen, setPreferencesOpen }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='transparent' className='font-semibold text-lg p-1.5 overflow-hidden shrink' size='sm'>
          <span className='truncate w-full'>{workspace.name}</span>
          <ChevronDown className='size-4 ml-1 shrink-0' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side='bottom' align='start' className='w-64'>
        <DropdownMenuItem className='cursor-pointer capitalize'>
          <div className='size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2 shrink-0'>
            {workspace.name.charAt(0).toUpperCase()}
          </div>

          <div className='flex flex-col items-start truncate'>
            <p className='font-bold truncate w-full'>{workspace.name}</p>
            <p className='text-xs text-muted-foreground'>Active workspace</p>
          </div>
        </DropdownMenuItem>

        {isAdmin && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem className='cursor-pointer py-2' onClick={() => setInviteOpen(true)}>
              <span className='truncate'>Invite people to {workspace.name}</span>
            </DropdownMenuItem>

            <DropdownMenuItem className='cursor-pointer py-2' onClick={() => setPreferencesOpen(true)}>
              Preferences
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown
