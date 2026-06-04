import Thumbnail from './thumbnail'
import React from 'react'
import dynamic from 'next/dynamic'
import Reactions from './reactions'
import ThreadBar from './thread-bar'
import { DefaultMessageType } from '@/types'
import MessageAvatar from './message-avatar'
import MessageInfo from './message-info'
import { Skeleton } from '../ui/skeleton'

const Renderer = dynamic(() => import('@/components/message-list/renderer'), {
  ssr: false,
  loading: () => <Skeleton className='h-5 w-full max-w-[500px] rounded ' />,
})
const Editor = dynamic(() => import('@/components/editor/index'), {
  ssr: false,
})

interface NonCompactMessageProps extends DefaultMessageType {
  isPending: boolean
  authorImage: string | undefined
  authorName: string
  handleUpdate: ({ body }: { body: string }) => void
  onOpenProfile: () => void
  handleThread: () => void
  handleReaction: (value: string) => void
  formatFullTime: (date: Date) => string
}

const NonCompactMessage: React.FC<NonCompactMessageProps> = ({
  onOpenProfile,
  handleThread,
  threadCount,
  threadImage,
  threadName,
  threadTimestamp,
  handleReaction,
  isPending,
  authorImage,
  authorName,
  body,
  createdAt,
  formatFullTime,
  image,
  updatedAt,
  isEditing,
  handleUpdate,
  setEditingId,
  reactions,
}) => {
  return (
    <div className='flex items-start gap-2 w-full'>
      <MessageAvatar name={authorName} image={authorImage} onOpenProfile={onOpenProfile} />

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
        <div className='flex flex-col w-full overflow-hidden'>
          <MessageInfo
            authorName={authorName}
            createdAt={createdAt}
            onOpenProfile={onOpenProfile}
            formatFullTime={formatFullTime}
          />

          <Renderer value={body} />
          <Thumbnail url={image} />
          {updatedAt ? <span className='text-xs text-muted-foreground'>(edited)</span> : null}
          <Reactions data={reactions} onChange={handleReaction} />
          <div className='min-h-7 w-full sm:max-w-[600px]'>
            <ThreadBar
              count={threadCount}
              image={threadImage}
              name={threadName}
              timestamp={threadTimestamp}
              onClick={handleThread}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default NonCompactMessage
