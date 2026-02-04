import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

interface MessageAvatarProps {
  name: string
  image: string | undefined
  onOpenProfile: () => void
}

const MessageAvatar: React.FC<MessageAvatarProps> = ({ name, image, onOpenProfile }) => {
  const avatarFallback = name.charAt(0).toUpperCase()

  return (
    <Button className='p-0 bg-transparent hover:bg-transparent cursor-pointer' onClick={onOpenProfile}>
      <Avatar>
        <AvatarImage src={image} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
    </Button>
  )
}

export default MessageAvatar
