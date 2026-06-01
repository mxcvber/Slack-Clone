import { Id } from '../../../../convex/_generated/dataModel'
import { useGetMessage } from '../api/use-get-message'
import Loading from '@/components/loading'
import NotFoundComponent from '@/components/not-found-component'
import Message from '@/components/message-list/message'
import { useCurrentMember } from '@/features/members/api/use-current-member'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useRef, useState } from 'react'
import ThreadHeader from './thread-header'
import dynamic from 'next/dynamic'
import type Quill from 'quill'
import { useCreateMessage } from '../api/use-create-message'
import { useGenerateUploadUrl } from '@/features/upload/api/use-generate-upload-url'
import { useChannelId } from '@/features/channels/hooks/use-channel-id'
import { toast } from 'sonner'
import { useGetMessages } from '../api/use-get-messages'
import { format } from 'date-fns'
import MessageLoader from '@/components/message-list/message-loader'
import NewMessages from './new-messages'

const Editor = dynamic(() => import('@/components/editor'), { ssr: false })

interface ThreadProps {
  messageId: Id<'messages'>
  onClose: () => void
}

type CreateMessageValues = {
  channelId: Id<'channels'>
  workspaceId: Id<'workspaces'>
  parentMessageId: Id<'messages'>
  body: string
  image: Id<'_storage'> | undefined
}

const Thread: React.FC<ThreadProps> = ({ messageId, onClose }) => {
  const workspaceId = useWorkspaceId()
  const channelId = useChannelId()

  const { data: message, isLoading: loadingMessage } = useGetMessage({ id: messageId })
  const { data: currentMember, isLoading: loadingCurrentMember } = useCurrentMember({ workspaceId })
  const { mutate: createMessage } = useCreateMessage()
  const { mutate: generateUploadUrl } = useGenerateUploadUrl()
  const { results, loadMore, status } = useGetMessages({ channelId, parentMessageId: messageId })

  const [editingId, setEditingId] = useState<Id<'messages'> | null>(null)
  const [editorKey, setEditorKey] = useState(0)
  const [isPending, setIsPending] = useState(false)
  const editorRef = useRef<Quill | null>(null)

  const canLoadMore = status === 'CanLoadMore'
  const isLoadingMore = status === 'LoadingMore'

  const groupedMessages: Record<string, Array<any>> | undefined = results?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime)
      const dateKey = format(date, 'yyyy-MM-dd')
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }

      groups[dateKey].unshift(message)

      return groups
    },
    {} as Record<string, typeof results>,
  )

  const handleSubmit = async ({ body, image }: { body: string; image: File | null }) => {
    try {
      setIsPending(true)
      if (!workspaceId || !channelId) return

      editorRef.current?.enable(false)

      const values: CreateMessageValues = {
        channelId,
        workspaceId,
        parentMessageId: messageId,
        body,
        image: undefined,
      }

      if (image) {
        const url = await generateUploadUrl({ throwError: true })

        if (!url) {
          throw new Error('Url not found')
        }

        const result = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': image.type },
          body: image,
        })

        if (!result.ok) {
          throw new Error('Failed to upload image')
        }

        const { storageId } = await result.json()

        values.image = storageId
      }

      await createMessage(values, { throwError: true })

      setEditorKey((prevKey) => prevKey + 1)
    } catch (error) {
      toast.error('Failed to send message')
    } finally {
      setIsPending(false)
      editorRef.current?.enable(true)
    }
  }

  if (loadingMessage || status === 'LoadingFirstPage' || loadingCurrentMember) {
    return (
      <div className='h-full flex flex-col'>
        <ThreadHeader title='Thread' onClose={onClose} />
        <Loading />
      </div>
    )
  }

  if (!message) {
    return (
      <div className='h-full flex flex-col'>
        <ThreadHeader title='Thread' onClose={onClose} />
        <NotFoundComponent label='Message not found' />
      </div>
    )
  }

  return (
    <div className='h-full flex flex-col'>
      <ThreadHeader title='Thread' onClose={onClose} />

      <div className='flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar'>
        {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
          <NewMessages
            key={dateKey}
            dateKey={dateKey}
            messages={messages}
            currentMember={currentMember}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        ))}

        <MessageLoader canLoadMore={canLoadMore} isLoadingMore={isLoadingMore} loadMore={loadMore} />

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

      <div className='sm:px-4'>
        <Editor
          key={editorKey}
          onSubmit={handleSubmit}
          disabled={isPending}
          innerRef={editorRef}
          placeholder='Reply...'
        />
      </div>
    </div>
  )
}

export default Thread
