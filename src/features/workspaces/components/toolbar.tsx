'use client'

import { Button } from '@/components/ui/button'
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { Info, Search } from 'lucide-react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { useState } from 'react'
import { useGetChannels } from '@/features/channels/api/use-get-channels'
import { useGetMembers } from '@/features/members/api/use-get-members'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Id } from '../../../../convex/_generated/dataModel'

const Toolbar = () => {
  const workspaceId = useWorkspaceId()
  const { data } = useGetWorkspace({ id: workspaceId })
  const { data: channels } = useGetChannels({ workspaceId })
  const { data: members } = useGetMembers({ workspaceId })

  const router = useRouter()
  const [open, setOpen] = useState(false)

  const onChannelClick = (channelId: Id<'channels'>) => {
    setOpen(false)
    router.push(`/workspace/${workspaceId}/channel/${channelId}`)
  }

  const onMemberClick = (memberId: Id<'members'>) => {
    setOpen(false)
    router.push(`/workspace/${workspaceId}/member/${memberId}`)
  }

  return (
    <header className='bg-dark-purple h-10 p-1.5'>
      <nav aria-label='Workspace navigation' className='flex items-center justify-between'>
        <div className='flex-1' />

        <div className='min-w-[280px] max-w-[642px] grow-2 shrink-0'>
          <Button
            onClick={() => setOpen(true)}
            size='sm'
            className='text-white bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2'
          >
            <Search className='size-4 mr-2' />
            <span className='text-xs truncate'>Search {data?.name}</span>
          </Button>

          <CommandDialog open={open} onOpenChange={setOpen}>
            <Command className='rounded-lg border'>
              <CommandInput placeholder='Type a command or search...' />
              <CommandList className='messages-scrollbar'>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading='Channels'>
                  {channels?.map((channel) => (
                    <CommandItem key={channel._id} onSelect={() => onChannelClick(channel._id)}>
                      <p className='truncate'># {channel.name}</p>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading='Members'>
                  {members?.map((member) => (
                    <CommandItem key={member._id} onSelect={() => onMemberClick(member._id)}>
                      <p className='truncate'>{member.user.name}</p>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </CommandDialog>
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
