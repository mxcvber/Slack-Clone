'use client'
import Loading from '@/components/loading'
import NotFoundComponent from '@/components/not-found-component'
import { useCreateOrGetConversation } from '@/features/conversations/api/use-create-or-get-conversation'
import { useMemberId } from '@/features/members/hooks/use-member-id'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useEffect, useState } from 'react'
import { Id } from '../../../../../../convex/_generated/dataModel'
import { toast } from 'sonner'
import Conversation from '@/features/conversations/components/conversation'

const MemberIdPage = () => {
  const workspaceId = useWorkspaceId()
  const memberId = useMemberId()

  const { mutate, isPending } = useCreateOrGetConversation()

  const [conversationId, setConversationId] = useState<Id<'conversations'> | null>(null)

  useEffect(() => {
    if (workspaceId && memberId) {
      mutate(
        { workspaceId, memberId },
        {
          onSuccess(id) {
            setConversationId(id)
          },
          onError() {
            toast.error('Failed to create or get conversation')
          },
        },
      )
    }
  }, [workspaceId, memberId])

  if (isPending) {
    return <Loading />
  }

  if (!conversationId) {
    return <NotFoundComponent label='conversation not found' />
  }

  return <Conversation id={conversationId} />
}

export default MemberIdPage
