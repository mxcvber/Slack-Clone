import NotFoundComponent from '@/components/not-found-component'
import { redirect } from 'next/navigation'
import { Id } from '../../../../convex/_generated/dataModel'
import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server'
import { fetchQuery } from 'convex/nextjs'
import { api } from '../../../../convex/_generated/api'
import JoinClient from '@/features/join/components/join-client'

const JoinPage = async ({ params }: { params: Promise<{ workspaceId: string }> }) => {
  const { workspaceId } = await params
  const token = await convexAuthNextjsToken()

  const data = await fetchQuery(api.workspaces.getInfoById, { id: workspaceId as Id<'workspaces'> }, { token })

  if (!data) return <NotFoundComponent label='Workspace not found' />

  if (data.isMember) redirect(`/workspace/${workspaceId}`)

  return <JoinClient workspaceId={workspaceId as Id<'workspaces'>} workspaceName={data.name} />
}

export default JoinPage
