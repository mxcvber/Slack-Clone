import { GetMessageReturnType } from '@/features/messages/api/use-get-messages'
import React from 'react'
import { differenceInMinutes, format, isToday, isYesterday } from 'date-fns'
import Message from './message'
import { TIME_TRESHOLD } from '@/constants'

interface MessageListProps {
  data: GetMessageReturnType | undefined
  loadMore: (() => void) | undefined
  isLoadingMore: boolean
  canLoadMore: boolean
  memberName?: string
  memberImage?: string
  channelName?: string
  channelCreationTime?: number
  variant?: 'channel' | 'thread' | 'conversation'
}

const MessageList: React.FC<MessageListProps> = ({
  memberName,
  memberImage,
  canLoadMore,
  data,
  isLoadingMore,
  loadMore,
  channelCreationTime,
  channelName,
  variant,
}) => {
  const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr)

    if (isToday(date)) return 'Today'
    if (isYesterday(date)) return 'Yesterday'
    return format(date, 'EEEE, MMMM d')
  }

  const groupedMessages = data?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime)
      const dateKey = format(date, 'yyyy-MM-dd')
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }

      groups[dateKey].unshift(message)

      return groups
    },
    {} as Record<string, typeof data>
  )

  return (
    <div className='flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar'>
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className='text-center my-2 relative'>
            <hr className='absolute top-1/2 left-0 right-0 border-gray-300' />
            <span className='relative inline-block bg-white px-4 py-1 rounded-full text-xs border-gray-300 shadow-sm'>
              {formatDateLabel(dateKey)}
            </span>
          </div>

          {messages.map((message, index) => {
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
                isAuthor={false}
                reactions={message.reactions}
                body={message.body}
                image={message.image}
                updatedAt={message.updatedAt}
                createdAt={message._creationTime}
                isEditing={false}
                setEditingId={() => {}}
                isCompact={isCompact}
                hideThreadButton={false}
                threadCount={message.threadCount}
                threadImage={message.threadImage}
                threadTimestapm={message.threadTimestamp}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default MessageList
