import React from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { ChevronRight } from 'lucide-react'

interface ThreadBarProps {
  count?: number
  image?: string
  timestamp?: number
  name?: string
  onClick?: () => void
}

const ThreadBar: React.FC<ThreadBarProps> = ({ count, image, name = 'Member', timestamp, onClick }) => {
  const avatarFallback = name.charAt(0).toUpperCase()

  if (!count || !timestamp) return null

  return (
    <Button
      onClick={onClick}
      className='gap-2 bg-transparent h-fit sm:max-w-[600px] p-1 rounded-md hover:bg-white border border-transparent hover:border-border flex items-center justify-start group/thread-bar transition'
    >
      <Avatar className='size-6 shrink-0'>
        <AvatarImage src={image} alt='Avatar' />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>

      <span className='text-xs text-sky-700 hover:underline font-bold'>
        {count} {count > 1 ? 'replies' : 'reply'}
      </span>

      <span className='text-xs text-muted-foreground truncate group-hover/thread-bar:hidden hidden sm:block'>
        Last reply {formatDistanceToNow(timestamp, { addSuffix: true })}
      </span>

      <span className='text-xs text-muted-foreground truncate group-hover/thread-bar:block hidden'>View thread</span>
      <ChevronRight className='size-4 text-muted-foreground ml-52 hidden group-hover/thread-bar:block transition shrink-0' />
    </Button>
  )
}

export default ThreadBar
