import DateSeparator from '@/components/message-list/date-separator'
import Message from '@/components/message-list/message'
import { TIME_TRESHOLD } from '@/constants'
import { differenceInMinutes } from 'date-fns'
import React, { Dispatch, SetStateAction } from 'react'
import { Id } from '../../../../convex/_generated/dataModel'
import { currentMember } from '@/features/members/types'

interface NewMessagesProps {
  editingId: Id<'messages'> | null
  currentMember: currentMember
  dateKey: string
  messages: Array<any>
  setEditingId: Dispatch<SetStateAction<Id<'messages'> | null>>
}

const NewMessages: React.FC<NewMessagesProps> = ({ setEditingId, editingId, currentMember, dateKey, messages }) => {
  return (
    <div key={dateKey}>
      <DateSeparator dateKey={dateKey} />

      {messages.map((message, index) => {
        if (!message) return null

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
            isAuthor={message.memberId === currentMember?._id}
            reactions={message.reactions}
            body={message.body}
            image={message.image}
            updatedAt={message.updatedAt}
            createdAt={message._creationTime}
            isEditing={editingId === message._id}
            setEditingId={setEditingId}
            isCompact={isCompact!}
            hideThreadButton
            threadCount={message.threadCount}
            threadImage={message.threadImage}
            threadName={message.threadName}
            threadTimestamp={message.threadTimestamp}
          />
        )
      })}
    </div>
  )
}

export default NewMessages
