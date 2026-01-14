import { format } from 'date-fns'
import Hint from '../hint'
import Thumbnail from './thumbnail'
import React from 'react'
import dynamic from 'next/dynamic'

const Renderer = dynamic(() => import('@/components/message-list/renderer'), { ssr: false })

interface CompactMessageProps {
  formatFullTime: (date: Date) => string
  createdAt: number
  updatedAt: number | undefined
  body: string
  image: string | null | undefined
}

const CompactMessage: React.FC<CompactMessageProps> = ({ body, createdAt, updatedAt, formatFullTime, image }) => {
  return (
    <div className='flex items-start gap-2 py-1.5 px-5 hover:bg-gray-100/60 group relative'>
      <Hint label={formatFullTime(new Date(createdAt))}>
        <span className='cursor-default text-muted-foreground text-xs opacity-0 group-hover:opacity-100 leading-[22px] hover:underline'>
          {format(new Date(createdAt), 'hh:mm')}
        </span>
      </Hint>

      <div className='flex flex-col w-full'>
        <Renderer value={body} />
        <Thumbnail url={image} />
        {updatedAt ? <span className='text-xs text-muted-foreground'>(edited)</span> : null}
      </div>
    </div>
  )
}

export default CompactMessage
