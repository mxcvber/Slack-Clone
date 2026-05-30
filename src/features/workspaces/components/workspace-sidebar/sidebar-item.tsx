'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useWorkspaceId } from '../../hooks/use-workspace-id'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useChannelId } from '@/features/channels/hooks/use-channel-id'
import { MessageSquareText, SendHorizonal, Hash } from 'lucide-react'

const sidebarItemVariants = cva(
  'flex items-center justify-start gap-1.5 font-normal text-sm h-7 px-[18px] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'text-light-gray',
        active: 'bg-white/90 hover:bg-white/90 text-dark-purple',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const icons = {
  threads: MessageSquareText,
  drafts: SendHorizonal,
  channel: Hash,
} as const

type IconKey = keyof typeof icons

interface SidebarItemProps {
  iconKey: IconKey
  label: string
  id: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, iconKey, id }) => {
  const workspaceId = useWorkspaceId()
  const channelId = useChannelId()
  const Icon = icons[iconKey]

  return (
    <Button
      className={cn(sidebarItemVariants({ variant: channelId === id ? 'active' : 'default' }))}
      variant='transparent'
      size='sm'
      asChild
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className='size-3 sm:size-3.5 mr-1 shrink-0' />
        <span className='text-xs sm:text-sm truncate'>{label}</span>
      </Link>
    </Button>
  )
}

export default SidebarItem
