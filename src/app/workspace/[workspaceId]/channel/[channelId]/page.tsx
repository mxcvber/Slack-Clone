'use client'

import Loading from '@/components/loading'
import MessageList from '@/components/message-list'
import NotFoundComponent from '@/components/not-found-component'
import { useGetChannel } from '@/features/channels/api/use-get-channel'
import ChatInput from '@/features/channels/components/chat-input'
import Header from '@/features/channels/components/header'
import { useChannelId } from '@/features/channels/hooks/use-channel-id'
import { useGetMessages } from '@/features/messages/api/use-get-messages'

const ChannelIdPage = () => {
  const channelId = useChannelId()

  const { data: channel, isLoading: channelLoading } = useGetChannel({ id: channelId })
  const { results, status, loadMore } = useGetMessages({ channelId })

  if (channelLoading || status === 'LoadingFirstPage') {
    return <Loading />
  }

  if (!channel) {
    return <NotFoundComponent label='Channel not found' />
  }

  return (
    <div className='flex flex-col h-full'>
      <Header name={channel.name} />
      <MessageList
        channelName={channel.name}
        channelCreationTime={channel._creationTime}
        data={results}
        loadMore={loadMore}
        isLoadingMore={status === 'LoadingMore'}
        canLoadMore={status === 'CanLoadMore'}
        variant='channel'
      />
      <ChatInput placeholder={`Message # ${channel.name}`} />
    </div>
  )
}

export default ChannelIdPage
