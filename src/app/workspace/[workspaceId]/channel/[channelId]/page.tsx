import NotFoundComponent from '@/components/not-found-component'
import { Id } from '../../../../../../convex/_generated/dataModel'
import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server'
import { fetchQuery } from 'convex/nextjs'
import { api } from '../../../../../../convex/_generated/api'
import ChannelIdContent from '@/features/channels/components/channel-id-content'

const ChannelIdPage = async ({ params }: { params: Promise<{ channelId: string }> }) => {
  const { channelId } = await params
  const token = await convexAuthNextjsToken()

  const channel = await fetchQuery(api.channels.getById, { id: channelId as Id<'channels'> }, { token })

  if (!channel) {
    return <NotFoundComponent label='Channel not found' />
  }

  return <ChannelIdContent channelId={channelId as Id<'channels'>} channel={channel} />
}

export default ChannelIdPage
