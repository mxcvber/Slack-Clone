import { cn } from '@/lib/utils'
import { DefaultMessageType } from '@/types'
import React from 'react'
import CompactMessage from './compact-message'
import NonCompactMessage from './non-compact-message'
import Toolbar from './toolbar/toolbar'
import { usePanel } from '@/hooks/use-panel'
import { format, isToday, isYesterday } from 'date-fns'
import { Id } from '../../../convex/_generated/dataModel'

interface MessageContentProps extends DefaultMessageType {
  memberId: Id<'members'>
  id: Id<'messages'>
  isRemovingMessage: boolean
  isCompact: boolean
  isPending: boolean
  isAuthor: boolean
  authorName: string
  authorImage: string | undefined
  hideThreadButton: boolean | undefined
  handleUpdate: ({ body }: { body: string }) => void
  handleReaction: (value: string) => void
  handleRemove: () => Promise<void>
}

const MessageContent: React.FC<MessageContentProps> = ({
  hideThreadButton,
  isAuthor,
  authorName,
  authorImage,
  memberId,
  handleRemove,
  handleReaction,
  handleUpdate,
  id,
  isPending,
  isCompact,
  isRemovingMessage,
  body,
  createdAt,
  image,
  isEditing,
  reactions,
  setEditingId,
  updatedAt,
  threadCount,
  threadImage,
  threadName,
  threadTimestamp,
}) => {
  const { onOpenMessage, onOpenProfile } = usePanel()

  const formatFullTime = (date: Date) => {
    return `${isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : format(date, 'MMM d, yyyy')} at ${format(date, 'h:mm:ss a')}`
  }

  return (
    <div
      className={cn(
        'flex py-1.5 px-1 sm:px-5 hover:bg-gray-100/60 group relative',
        isEditing && 'bg-[#f2c74433] hover:bg-[#f2c64448] duration-300',
        isRemovingMessage && 'bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200',
      )}
    >
      {isCompact ? (
        <CompactMessage
          handleThread={() => onOpenMessage(id)}
          threadCount={threadCount}
          threadImage={threadImage}
          threadName={threadName}
          threadTimestamp={threadTimestamp}
          reactions={reactions}
          setEditingId={setEditingId}
          isPending={isPending}
          handleUpdate={handleUpdate}
          body={body}
          createdAt={createdAt}
          updatedAt={updatedAt}
          formatFullTime={formatFullTime}
          image={image}
          isEditing={isEditing}
          handleReaction={handleReaction}
        />
      ) : (
        <NonCompactMessage
          onOpenProfile={() => onOpenProfile(memberId)}
          handleThread={() => onOpenMessage(id)}
          threadCount={threadCount}
          threadImage={threadImage}
          threadName={threadName}
          threadTimestamp={threadTimestamp}
          reactions={reactions}
          setEditingId={setEditingId}
          isPending={isPending}
          handleUpdate={handleUpdate}
          isEditing={isEditing}
          authorImage={authorImage}
          authorName={authorName}
          body={body}
          createdAt={createdAt}
          formatFullTime={formatFullTime}
          image={image}
          updatedAt={updatedAt}
          handleReaction={handleReaction}
        />
      )}

      {!isEditing && (
        <Toolbar
          isAuthor={isAuthor}
          isPending={isPending}
          handleEdit={() => setEditingId(id)}
          handleThread={() => onOpenMessage(id)}
          handleDelete={handleRemove}
          handleReaction={handleReaction}
          hideThreadButton={hideThreadButton}
        />
      )}
    </div>
  )
}

export default MessageContent
