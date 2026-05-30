import NotFoundComponent from '@/components/not-found-component'
import { Id } from '../../../../../../convex/_generated/dataModel'
import Conversation from '@/features/conversations/components/conversation'
import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server'
import { fetchMutation } from 'convex/nextjs'
import { api } from '../../../../../../convex/_generated/api'

interface MemberIdPageProps {
  params: Promise<{
    workspaceId: Id<'workspaces'>
    memberId: Id<'members'>
  }>
}

const MemberIdPage: React.FC<MemberIdPageProps> = async ({ params }) => {
  const { workspaceId, memberId } = await params
  const token = await convexAuthNextjsToken()

  try {
    const conversationId = await fetchMutation(api.conversations.createOrGet, { workspaceId, memberId }, { token })

    if (!conversationId) {
      return <NotFoundComponent label='conversation not found' />
    }

    return <Conversation memberId={memberId} id={conversationId} />
  } catch {
    return <NotFoundComponent label='Failed to create or get conversation' />
  }
}

export default MemberIdPage
