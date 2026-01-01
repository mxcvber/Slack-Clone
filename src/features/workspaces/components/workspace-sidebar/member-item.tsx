import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Id } from '../../../../../convex/_generated/dataModel'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useWorkspaceId } from '../../hooks/use-workspace-id'

const memberItemVariants = cva('flex items-center justify-start gap-1.5 font-normal text-sm h-7 px-4 overflow-hidden', {
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
  variant?: VariantProps<typeof memberItemVariants>['variant']
}

const MemberItem: React.FC<MemberItemProps> = ({ id, image, label = 'Member', variant }) => {
  const workspaceId = useWorkspaceId()
  const avatarFallback = label.charAt(0).toUpperCase()

  return (
    <Button variant='transparent' className={cn(memberItemVariants({ variant: variant }))} size='sm' asChild>
      <Link href={`/workspace/${workspaceId}/member/${id}`}>
        <Avatar className='size-5 rounded-md mr-1'>
          <AvatarImage className='rounded-md' src={image} />
          <AvatarFallback className='rounded-md bg-sky-500 text-white text-xs'>{avatarFallback}</AvatarFallback>
        </Avatar>
        <span className='text-sm truncate'>{label}</span>
      </Link>
    </Button>
  )
}

export default MemberItem
