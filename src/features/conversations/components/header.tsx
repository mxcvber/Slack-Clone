'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { usePanel } from '@/hooks/use-panel'
import React from 'react'
import { Id } from '../../../../convex/_generated/dataModel'
import { ChevronDownIcon } from 'lucide-react'

interface HeaderProps {
  memberName?: string
  memberImage?: string
  memberId: Id<'members'>
}

const Header: React.FC<HeaderProps> = ({ memberName = 'Member', memberImage, memberId }) => {
  const avatarFallback = memberName.charAt(0).toUpperCase()

  const { onOpenProfile } = usePanel()
  return (
    <div className='bg-white border-b h-[49px] flex items-center px-4 overflow-hidden'>
      <Button
        variant='ghost'
        className='text-lg font-semibold px-2 overflow-hidden w-auto shrink-0'
        size='sm'
        onClick={() => onOpenProfile(memberId)}
      >
        <Avatar className='size-7'>
          <AvatarImage width={28} height={28} src={memberImage} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <span className='truncate'>{memberName}</span>
        <ChevronDownIcon className='size-4' />
      </Button>
    </div>
  )
}

export default Header
