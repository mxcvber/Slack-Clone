import { Id } from '../../../../convex/_generated/dataModel'
import { useGetMessage } from '../api/use-get-message'
import Loading from '@/components/loading'
import NotFoundComponent from '@/components/not-found-component'
import Message from '@/components/message-list/message'
import { useCurrentMember } from '@/features/members/api/use-current-member'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useState } from 'react'
import ThreadHeader from './thread-header'

interface ThreadProps {
  messageId: Id<'messages'>
  onClose: () => void
}

const Thread: React.FC<ThreadProps> = ({ messageId, onClose }) => {
  const workspaceId = useWorkspaceId()

  const { data: message, isLoading: loadingMessage } = useGetMessage({ id: messageId })
  const { data: currentMember, isLoading: loadingCurrentMember } = useCurrentMember({ workspaceId })

  const [editingId, setEditingId] = useState<Id<'messages'> | null>(null)

  if (loadingMessage) {
    return (
      <div className='h-full flex flex-col'>
        <ThreadHeader onClose={onClose} />
        <Loading />
      </div>
    )
  }

  if (!message) {
    return (
      <div className='h-full flex flex-col'>
        <ThreadHeader onClose={onClose} />
        <NotFoundComponent label='Message not found' />
      </div>
    )
  }

  return (
    <div className='h-full flex flex-col'>
      <ThreadHeader onClose={onClose} />

      <div>
        <Message
          hideThreadButton
          memberId={message.memberId}
          authorImage={message.user.image}
          authorName={message.user.name}
          isAuthor={message.memberId === currentMember?._id}
          body={message.body}
          image={message.image}
          createdAt={message._creationTime}
          updatedAt={message.updatedAt}
          id={message._id}
          reactions={message.reactions}
          isEditing={editingId === message._id}
          setEditingId={setEditingId}
          isCompact={false}
        />
      </div>
    </div>
  )
}

export default Thread
