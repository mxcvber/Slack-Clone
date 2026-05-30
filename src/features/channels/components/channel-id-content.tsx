import Header from '@/features/channels/components/header'
import ChatInput from '@/features/channels/components/chat-input'
import MessageList from '@/components/message-list'
import { Doc, Id } from '../../../../convex/_generated/dataModel'

interface ChannelIdContentProps {
  channel: Doc<'channels'>
  channelId: Id<'channels'>
}

const ChannelIdContent: React.FC<ChannelIdContentProps> = ({ channel, channelId }) => {
  return (
    <div className='flex flex-col h-full'>
      <Header name={channel.name} />
      <MessageList
        channelId={channelId}
        channelName={channel.name}
        channelCreationTime={channel._creationTime}
        variant='channel'
      />
      <ChatInput placeholder={`Message # ${channel.name}`} />
    </div>
  )
}

export default ChannelIdContent
