import { format } from 'date-fns'
import Hint from '../hint'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import Thumbnail from './thumbnail'
import React from 'react'
import dynamic from 'next/dynamic'

const Renderer = dynamic(() => import('@/components/message-list/renderer'), { ssr: false })

interface NonCompactMessageProps {
  authorImage: string | undefined
  authorName: string
  body: string
  image: string | null | undefined
  formatFullTime: (date: Date) => string
  createdAt: number
  updatedAt: number | undefined
}

const NonCompactMessage: React.FC<NonCompactMessageProps> = ({
  authorImage,
  authorName,
  body,
  createdAt,
  formatFullTime,
  image,
  updatedAt,
}) => {
  const avatarFallback = authorName.charAt(0).toUpperCase()

  return (
    <div className='flex items-start gap-2 py-1.5 px-5 hover:bg-gray-100/60 group relative'>
      <Avatar>
        <AvatarImage src={authorImage} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>

      <div className='flex flex-col w-full overflow-hidden'>
        <div className='text-sm'>
          <Button
            onClick={() => {}}
            className='h-auto p-0 bg-transparent hover:bg-transparent cursor-pointer font-bold text-primary hover:underline'
          >
            {authorName}
          </Button>

          <span>&nbsp;&nbsp;</span>

          <Hint label={formatFullTime(new Date(createdAt))}>
            <span className='cursor-default text-xs text-muted-foreground hover:underline'>
              {format(new Date(createdAt), 'h:mm a')}
            </span>
          </Hint>
        </div>

        <Renderer value={body} />
        <Thumbnail url={image} />
        {updatedAt ? <span className='text-xs text-muted-foreground'>(edited)</span> : null}
      </div>
    </div>
  )
}

export default NonCompactMessage
