'use client'

import Loading from '@/components/loading'
import NotFoundComponent from '@/components/not-found-component'
import { useGetChannel } from '@/features/channels/api/use-get-channel'
import ChatInput from '@/features/channels/components/chat-input'
import Header from '@/features/channels/components/header'
import { useChannelId } from '@/features/channels/hooks/use-channel-id'

const ChannelIdPage = () => {
  const channelId = useChannelId()

  const { data: channel, isLoading: channelLoading } = useGetChannel({ id: channelId })

  if (channelLoading) {
    return <Loading />
  }

  if (!channel) {
    return <NotFoundComponent label='Channel not found' />
  }

  return (
    <div className='flex flex-col h-full'>
      <Header name={channel.name} />
      <div className='flex-1' />
      <ChatInput placeholder={`Message # ${channel.name}`} />
    </div>
  )
}

export default ChannelIdPage
