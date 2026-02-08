import React, { useState } from 'react'
import Message from './message'
import { differenceInMinutes } from 'date-fns'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useCurrentMember } from '@/features/members/api/use-current-member'
import { Id } from '../../../convex/_generated/dataModel'
import { TIME_TRESHOLD } from '@/constants'

interface MessageListContentProps {
  messages: Array<any>
  variant?: 'channel' | 'thread' | 'conversation'
}

const MessageListContent: React.FC<MessageListContentProps> = ({ messages, variant }) => {
  const workspaceId = useWorkspaceId()

  const { data: currentMember } = useCurrentMember({ workspaceId })

  const [editingId, setEditingId] = useState<Id<'messages'> | null>(null)

  return messages.map((message, index) => {
    const prevMessage = messages[index - 1]

    const isCompact =
      prevMessage &&
      prevMessage.user._id === message.user._id &&
      differenceInMinutes(new Date(message._creationTime), new Date(prevMessage._creationTime)) < TIME_TRESHOLD

    return (
      <Message
        key={message._id}
        id={message._id}
        memberId={message.memberId}
        authorImage={message.user.image}
        authorName={message.user.name}
        reactions={message.reactions}
        body={message.body}
        image={message.image}
        updatedAt={message.updatedAt}
        createdAt={message._creationTime}
        isCompact={isCompact}
        threadCount={message.threadCount}
        threadImage={message.threadImage}
        threadName={message.threadName}
        threadTimestamp={message.threadTimestamp}
        isAuthor={message.memberId === currentMember?._id}
        isEditing={editingId === message._id}
        setEditingId={setEditingId}
        hideThreadButton={variant === 'thread'}
      />
    )
  })
}

export default MessageListContent
