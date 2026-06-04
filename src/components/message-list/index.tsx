'use client'

import React from 'react'
import { format } from 'date-fns'
import ChannelHero from './heros/channel-hero'
import MessageLoader from './message-loader'
import ConversationHero from './heros/conversation-hero'
import DateSeparator from './date-separator'
import MessageListContent from './message-list-content'
import { useGetMessages } from '@/features/messages/api/use-get-messages'
import { Id } from '../../../convex/_generated/dataModel'
import MessageListSkeleton from './message-list-skeleton'

interface MessageListProps {
  channelId?: Id<'channels'> | null
  conversationId?: Id<'conversations'>
  memberName?: string
  memberImage?: string
  channelName?: string
  channelCreationTime?: number
  variant?: 'channel' | 'thread' | 'conversation'
}

const MessageList: React.FC<MessageListProps> = ({
  channelId,
  conversationId,
  memberName,
  memberImage,
  channelCreationTime,
  channelName,
  variant,
}) => {
  const { results: data, loadMore, status } = useGetMessages({ channelId, conversationId })

  const groupedMessages: Record<string, Array<any>> = data?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime)

      const dateKey = format(date, 'yyyy-MM-dd')
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }

      groups[dateKey].unshift(message)

      return groups
    },
    {} as Record<string, typeof data>,
  ) ?? {}

  return (
    <div className='flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar'>
      {status === 'LoadingFirstPage' ? (
        <MessageListSkeleton />
      ) : (
        Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
          <div key={dateKey}>
            <DateSeparator dateKey={dateKey} />

            <MessageListContent messages={messages} variant={variant} />
          </div>
        ))
      )}

      <MessageLoader
        canLoadMore={status === 'CanLoadMore'}
        isLoadingMore={status === 'LoadingMore'}
        loadMore={loadMore}
      />

      {variant === 'channel' && channelName && channelCreationTime && (
        <ChannelHero name={channelName} creatinTime={channelCreationTime} />
      )}

      {variant === 'conversation' && <ConversationHero name={memberName} image={memberImage} />}
    </div>
  )
}

export default MessageList
