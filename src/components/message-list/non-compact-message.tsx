import { format } from 'date-fns'
import Hint from '../hint'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import Thumbnail from './thumbnail'
import React from 'react'
import dynamic from 'next/dynamic'
import { Doc, Id } from '../../../convex/_generated/dataModel'
import Reactions from './reactions'

const Renderer = dynamic(() => import('@/components/message-list/renderer'), { ssr: false })
const Editor = dynamic(() => import('@/components/editor/index'), { ssr: false })

interface NonCompactMessageProps {
  handleReaction: (value: string) => void
  setEditingId: (id: Id<'messages'> | null) => void
  isPending: boolean
  handleUpdate: ({ body }: { body: string }) => void
  isEditing: boolean
  authorImage: string | undefined
  authorName: string
  body: string
  image: string | null | undefined
  formatFullTime: (date: Date) => string
  createdAt: number
  updatedAt: number | undefined
  reactions: Array<
    Omit<Doc<'reactions'>, 'memberId'> & {
      count: number
      memberIds: Id<'members'>[]
    }
  >
}

const NonCompactMessage: React.FC<NonCompactMessageProps> = ({
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
  const avatarFallback = authorName.charAt(0).toUpperCase()

  return (
    <div className='flex items-start gap-2'>
      <Avatar>
        <AvatarImage src={authorImage} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>

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
          <Reactions data={reactions} onChange={handleReaction} />
        </div>
      )}
    </div>
  )
}

export default NonCompactMessage
