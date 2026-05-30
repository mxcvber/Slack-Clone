'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { usePanel } from '@/hooks/use-panel'
import React from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { Id } from '../../../../convex/_generated/dataModel'

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
        className='text-lg font-semibold px-2 overflow-hidden w-auto'
        size='sm'
        onClick={() => onOpenProfile(memberId)}
      >
        <Avatar>
          <AvatarImage src={memberImage} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <span className='truncate'>{memberName}</span>
        <FaChevronDown className='size-2.5 ml-2' />
      </Button>
    </div>
  )
}

export default Header
