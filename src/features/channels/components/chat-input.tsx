'use client'

import { useCreateMessage } from '@/features/messages/api/use-create-message'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import dynamic from 'next/dynamic'
import type Quill from 'quill'
import React, { useRef, useState } from 'react'
import { useChannelId } from '../hooks/use-channel-id'
import { toast } from 'sonner'
import { useGenerateUploadUrl } from '@/features/upload/api/use-generate-upload-url'
import { Id } from '../../../../convex/_generated/dataModel'
import { Skeleton } from '@/components/ui/skeleton'

const Editor = dynamic(() => import('@/components/editor'), {
  ssr: false,
  loading: () => <Skeleton className='w-full h-[130px] mb-9 bg-zinc-200' />,
})

type CreateMessageValues = {
  channelId: Id<'channels'>
  workspaceId: Id<'workspaces'>
  body: string
  image: Id<'_storage'> | undefined
}

interface ChatInputProps {
  placeholder: string
}

const ChatInput: React.FC<ChatInputProps> = ({ placeholder }) => {
  const workspaceId = useWorkspaceId()
  const channelId = useChannelId()

  const { mutate: createMessage } = useCreateMessage()
  const { mutate: generateUploadUrl } = useGenerateUploadUrl()

  const [editorKey, setEditorKey] = useState(0)
  const [isPending, setIsPending] = useState(false)
  const editorRef = useRef<Quill | null>(null)

  const handleSubmit = async ({ body, image }: { body: string; image: File | null }) => {
    try {
      setIsPending(true)
      if (!workspaceId || !channelId) return

      editorRef.current?.enable(false)

      const values: CreateMessageValues = {
        channelId,
        workspaceId,
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

  return (
    <div className='px-0 sm:px-5 w-full font-extrabold'>
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
