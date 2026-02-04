import React from 'react'
import { Button } from '../ui/button'
import { formatDate } from 'date-fns'
import Hint from '../hint'

interface MessageInfoProps {
  authorName: string
  createdAt: number
  onOpenProfile: () => void
  formatFullTime: (date: Date) => string
}

const MessageInfo: React.FC<MessageInfoProps> = ({ onOpenProfile, formatFullTime, authorName, createdAt }) => {
  return (
    <div className='text-sm'>
      <Button
        onClick={onOpenProfile}
        className='h-auto p-0 bg-transparent hover:bg-transparent font-bold text-primary hover:underline'
      >
        {authorName}
      </Button>

      <span>&nbsp;&nbsp;</span>

      <Hint label={formatFullTime(new Date(createdAt))}>
        <span className='cursor-default text-xs text-muted-foreground hover:underline'>
          {formatDate(new Date(createdAt), 'h:mm a')}
        </span>
      </Hint>
    </div>
  )
}

export default MessageInfo
