'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Id } from '../../../../convex/_generated/dataModel'
import { Search } from 'lucide-react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

interface ToolbarSearchProps {
  workspaceId: Id<'workspaces'>
  workspaceName?: string
  channels: { _id: Id<'channels'>; name: string }[]
  members: { _id: Id<'members'>; user: { name?: string } }[]
}

const ToolbarSearch: React.FC<ToolbarSearchProps> = ({ workspaceId, workspaceName, channels, members }) => {
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
    <div className='w-36 max-w-[642px] grow-2 shrink-0'>
      <Button
        onClick={() => setOpen(true)}
        size='sm'
        className='text-white bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2'
      >
        <Search className='size-4 mr-2' />
        <span className='text-xs truncate'>Search {workspaceName}</span>
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
  )
}

export default ToolbarSearch
