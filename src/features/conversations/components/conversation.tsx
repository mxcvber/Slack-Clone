import { Id } from '../../../../convex/_generated/dataModel'
import NotFoundComponent from '@/components/not-found-component'
import Header from './header'
import ChatInput from './chat-input'
import MessageList from '@/components/message-list'
import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server'
import { fetchQuery } from 'convex/nextjs'
import { api } from '../../../../convex/_generated/api'

interface ConversationProps {
  id: Id<'conversations'>
  memberId: Id<'members'>
}

const Conversation: React.FC<ConversationProps> = async ({ id, memberId }) => {
  const token = await convexAuthNextjsToken()
  const member = await fetchQuery(api.members.getById, { id: memberId }, { token })

  if (!member) {
    return <NotFoundComponent label='member not found' />
  }

  return (
    <div className='flex flex-col h-full'>
      <Header memberName={member.user.name} memberImage={member.user.image} memberId={member._id} />
      <MessageList
        conversationId={id}
        variant='conversation'
        memberImage={member.user.image}
        memberName={member.user.name}
      />
      <ChatInput placeholder={`Message ${member.user.name}`} conversationId={id} />
    </div>
  )
}

export default Conversation
