import { format } from 'date-fns'
import Hint from '../hint'
import Thumbnail from './thumbnail'
import React from 'react'
import dynamic from 'next/dynamic'
import { Doc, Id } from '../../../convex/_generated/dataModel'
import Reactions from './reactions'

const Renderer = dynamic(() => import('@/components/message-list/renderer'), { ssr: false })
const Editor = dynamic(() => import('@/components/editor/index'), { ssr: false })

interface CompactMessageProps {
  handleReaction: (value: string) => void
  setEditingId: (id: Id<'messages'> | null) => void
  formatFullTime: (date: Date) => string
  createdAt: number
  updatedAt: number | undefined
  body: string
  image: string | null | undefined
  isEditing: boolean
  isPending: boolean
  handleUpdate: ({ body }: { body: string }) => void
  reactions: Array<
    Omit<Doc<'reactions'>, 'memberId'> & {
      count: number
      memberIds: Id<'members'>[]
    }
  >
}

const CompactMessage: React.FC<CompactMessageProps> = ({
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
        </div>
      )}
    </div>
  )
}

export default CompactMessage
