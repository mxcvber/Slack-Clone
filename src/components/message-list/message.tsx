import React from 'react'
import { Id } from '../../../convex/_generated/dataModel'
import { useUpdateMessage } from '@/features/messages/api/use-update-message'
import { toast } from 'sonner'
import { useRemoveMessage } from '@/features/messages/api/use-remove-message'
import useConfirm from '@/hooks/use-confirm'
import { useToggleReaction } from '@/features/reactions/api/use-toggle-reaction'
import { usePanel } from '@/hooks/use-panel'
import { DefaultMessageType } from '@/types'
import MessageContent from './message-content'

interface MessageProps extends DefaultMessageType {
  id: Id<'messages'>
  memberId: Id<'members'>
  isAuthor: boolean
  isCompact: boolean
  authorImage?: string
  authorName?: string
  hideThreadButton?: boolean
}

const Message: React.FC<MessageProps> = ({
  body,
  createdAt,
  id,
  image,
  isAuthor,
  isEditing,
  memberId,
  reactions,
  setEditingId,
  updatedAt,
  hideThreadButton,
  threadCount,
  threadImage,
  threadName,
  threadTimestamp,
  authorImage,
  isCompact,
  authorName = 'Member',
}) => {
  const { parentMessageId, onClose } = usePanel()

  const { mutate: updateMessage, isPending: isUpdatingMessage } = useUpdateMessage()
  const { mutate: removeMessage, isPending: isRemovingMessage } = useRemoveMessage()
  const { mutate: toggleReaction, isPending: isTogglingReaction } = useToggleReaction()
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete message',
    'Are you sure you want to delete this message? This cannot be undone.',
  )

  const isPending = isUpdatingMessage || isRemovingMessage || isTogglingReaction

  const handleReaction = (value: string) => {
    toggleReaction(
      { messageId: id, value },
      {
        onError: () => {
          toast.error('Failed to toggle reaction')
        },
      },
    )
  }

  const handleRemove = async () => {
    const ok = await confirm()

    if (!ok) return

    removeMessage(
      { id },
      {
        onSuccess: () => {
          toast.success('Message deleted')

          if (parentMessageId === id) {
            onClose()
          }
        },
        onError: () => {
          toast.error('Failed to delete message')
        },
      },
    )
  }

  const handleUpdate = ({ body }: { body: string }) => {
    updateMessage(
      { id, body },
      {
        onSuccess: () => {
          toast.success('Message updated')
          setEditingId(null)
        },
        onError: () => {
          toast.error('Failed to update message')
        },
      },
    )
  }

  return (
    <>
      <ConfirmDialog />

      <MessageContent
        isAuthor={isAuthor}
        authorName={authorName}
        authorImage={authorImage}
        memberId={memberId}
        hideThreadButton={hideThreadButton}
        handleRemove={handleRemove}
        handleReaction={handleReaction}
        handleUpdate={handleUpdate}
        id={id}
        isPending={isPending}
        isCompact={isCompact}
        isRemovingMessage={isRemovingMessage}
        body={body}
        createdAt={createdAt}
        image={image}
        isEditing={isEditing}
        reactions={reactions}
        setEditingId={setEditingId}
        updatedAt={updatedAt}
        threadCount={threadCount}
        threadImage={threadImage}
        threadName={threadName}
        threadTimestamp={threadTimestamp}
      />
    </>
  )
}

export default Message
