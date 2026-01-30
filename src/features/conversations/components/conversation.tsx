import { useMemberId } from '@/features/members/hooks/use-member-id'
import { Id } from '../../../../convex/_generated/dataModel'
import { useGetMember } from '@/features/members/api/use-get-member'
import { useGetMessages } from '@/features/messages/api/use-get-messages'
import Loading from '@/components/loading'
import NotFoundComponent from '@/components/not-found-component'
import Header from './header'
import ChatInput from './chat-input'
import MessageList from '@/components/message-list'
import { usePanel } from '@/hooks/use-panel'

interface ConversationProps {
  id: Id<'conversations'>
}

const Conversation: React.FC<ConversationProps> = ({ id }: { id: Id<'conversations'> }) => {
  const memberId = useMemberId()

  const { onOpenProfile } = usePanel()
  const { data: member, isLoading: isMemberLoading } = useGetMember({ id: memberId })
  const { results, loadMore, status } = useGetMessages({ conversationId: id })

  if (isMemberLoading || status === 'LoadingFirstPage') {
    return <Loading />
  }

  if (!member) {
    return <NotFoundComponent label='member not found' />
  }

  return (
    <div className='flex flex-col h-full'>
      <Header memberName={member.user.name} memberImage={member.user.image} onClick={() => onOpenProfile(member._id)} />
      <MessageList
        data={results}
        variant='conversation'
        memberImage={member.user.image}
        memberName={member.user.name}
        loadMore={loadMore}
        isLoadingMore={status === 'LoadingMore'}
        canLoadMore={status === 'CanLoadMore'}
      />
      <ChatInput placeholder={`Message ${member.user.name}`} conversationId={id} />
    </div>
  )
}

export default Conversation
