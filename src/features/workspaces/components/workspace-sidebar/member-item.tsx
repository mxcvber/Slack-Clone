'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Id } from '../../../../../convex/_generated/dataModel'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useWorkspaceId } from '../../hooks/use-workspace-id'
import { useMemberId } from '@/features/members/hooks/use-member-id'

const memberItemVariants = cva('flex items-center justify-start gap-1.5 font-normal text-sm h-7 overflow-hidden', {
  variants: {
    variant: {
      default: 'text-light-gray',
      active: 'bg-white/90 hover:bg-white/90 text-dark-purple',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface MemberItemProps {
  id: Id<'members'>
  label?: string
  image?: string
}

const MemberItem: React.FC<MemberItemProps> = ({ id, image, label = 'Member' }) => {
  const workspaceId = useWorkspaceId()
  const memberId = useMemberId()
  const avatarFallback = label.charAt(0).toUpperCase()

  return (
    <Button
      variant='transparent'
      className={cn(memberItemVariants({ variant: memberId === id ? 'active' : 'default' }))}
      size='sm'
      asChild
    >
      <Link href={`/workspace/${workspaceId}/member/${id}`}>
        <Avatar className='size-4.5 sm:size-5 mr-1'>
          <AvatarImage src={image} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <span className='text-xs sm:text-sm truncate'>{label}</span>
      </Link>
    </Button>
  )
}

export default MemberItem
