import { useCreateMessage } from '@/features/messages/api/use-create-message'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import dynamic from 'next/dynamic'
import Quill from 'quill'
import React, { useRef, useState } from 'react'
import { useChannelId } from '../hooks/use-channel-id'
import { toast } from 'sonner'

const Editor = dynamic(() => import('@/components/editor'), { ssr: false })

interface ChatInputProps {
  placeholder: string
}

const ChatInput: React.FC<ChatInputProps> = ({ placeholder }) => {
  const workspaceId = useWorkspaceId()
  const channelId = useChannelId()
  const { mutate } = useCreateMessage()

  const [editorKey, setEditorKey] = useState(0)
  const [isPending, setIsPending] = useState(false)
  const editorRef = useRef<Quill | null>(null)

  const handleSubmit = async ({ body, image }: { body: string; image: File | null }) => {
    try {
      setIsPending(true)
      if (!workspaceId || !channelId) return

      mutate(
        {
          workspaceId,
          channelId,
          body,
        },
        { throwError: true }
      )

      setEditorKey((prevKey) => prevKey + 1)
    } catch (error) {
      toast.error('Failed to send message')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className='px-5 w-full'>
      <Editor
        key={editorKey}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  )
}

export default ChatInput
