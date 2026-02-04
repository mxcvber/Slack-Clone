import { format } from 'date-fns'
import Hint from '../hint'
import Thumbnail from './thumbnail'
import React from 'react'
import dynamic from 'next/dynamic'
import Reactions from './reactions'
import ThreadBar from './thread-bar'
import { DefaultMessageType } from '@/types'

const Renderer = dynamic(() => import('@/components/message-list/renderer'), { ssr: false })
const Editor = dynamic(() => import('@/components/editor/index'), { ssr: false })

interface CompactMessageProps extends DefaultMessageType {
  isPending: boolean
  handleThread: () => void
  handleReaction: (value: string) => void
  formatFullTime: (date: Date) => string
  handleUpdate: ({ body }: { body: string }) => void
}

const CompactMessage: React.FC<CompactMessageProps> = ({
  handleThread,
  handleReaction,
  setEditingId,
  handleUpdate,
  isPending,
  body,
  createdAt,
  updatedAt,
  formatFullTime,
  image,
  isEditing,
  reactions,
  threadCount,
  threadImage,
  threadName,
  threadTimestamp,
}) => {
  return (
    <div className='flex items-start gap-2'>
      <Hint label={formatFullTime(new Date(createdAt))}>
        <span className='cursor-default text-muted-foreground text-xs opacity-0 group-hover:opacity-100 leading-[22px] hover:underline'>
          {format(new Date(createdAt), 'hh:mm')}
        </span>
      </Hint>

      {isEditing ? (
        <div className='w-full h-full'>
          <Editor
            onSubmit={handleUpdate}
            disabled={isPending}
            defaultValue={JSON.parse(body)}
            onCancel={() => setEditingId(null)}
            variant='update'
          />
        </div>
      ) : (
        <div className='flex flex-col w-full'>
          <Renderer value={body} />
          <Thumbnail url={image} />
          {updatedAt ? <span className='text-xs text-muted-foreground'>(edited)</span> : null}
          <Reactions data={reactions} onChange={handleReaction} />
          <ThreadBar
            count={threadCount}
            name={threadName}
            image={threadImage}
            timestamp={threadTimestamp}
            onClick={handleThread}
          />
        </div>
      )}
    </div>
  )
}

export default CompactMessage
