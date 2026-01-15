import React from 'react'
import { Doc, Id } from '../../../convex/_generated/dataModel'
import { format, isToday, isYesterday } from 'date-fns'
import CompactMessage from './compact-message'
import NonCompactMessage from './non-compact-message'

interface MessageProps {
  id: Id<'messages'>
  memberId: Id<'members'>
  isAuthor: boolean
  reactions: Array<
    Omit<Doc<'reactions'>, 'memberId'> & {
      count: number
      memberIds: Id<'members'>[]
    }
  >
  body: Doc<'messages'>['body']
  image: string | null | undefined
  createdAt: Doc<'messages'>['_creationTime']
  updatedAt: Doc<'messages'>['updatedAt']
  isEditing: boolean
  setEditingId: (id: Id<'messages'> | null) => void
  isCompact: boolean
  authorImage?: string
  authorName?: string
  hideThreadButton?: boolean
  threadCount?: number
  threadImage?: string
  threadTimestapm?: number
}

const Message: React.FC<MessageProps> = ({
  body,
  createdAt,
  id,
  image,
  isAuthor,
  isEditing,
  memberId,
  reactions,
  setEditingId,
  updatedAt,
  hideThreadButton,
  isCompact,
  threadCount,
  threadImage,
  threadTimestapm,
  authorImage,
  authorName = 'Member',
}) => {
  const formatFullTime = (date: Date) => {
    return `${isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : format(date, 'MMM d, yyyy')} at ${format(date, 'h:mm:ss a')}`
  }

  return isCompact ? (
    <CompactMessage
      body={body}
      createdAt={createdAt}
      updatedAt={updatedAt}
      formatFullTime={formatFullTime}
      image={image}
    />
  ) : (
    <NonCompactMessage
      id={id}
      isAuthor={isAuthor}
      setEditingId={setEditingId}
      hideThreadButton={hideThreadButton}
      isEditing={isEditing}
      authorImage={authorImage}
      authorName={authorName}
      body={body}
      createdAt={createdAt}
      formatFullTime={formatFullTime}
      image={image}
      updatedAt={updatedAt}
    />
  )
}

export default Message
