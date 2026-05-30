import { fetchQuery } from 'convex/nextjs'
import { api } from '../../convex/_generated/api'
import { redirect } from 'next/navigation'
import CreateWorkspaceModal from '@/features/workspaces/components/modals/create-workspace-modal'
import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server'

export default async function Home() {
  const workspaces = await fetchQuery(api.workspaces.get, {}, { token: await convexAuthNextjsToken() })

  if (workspaces?.[0]?._id) {
    redirect(`/workspace/${workspaces[0]._id}`)
  }

  return <CreateWorkspaceModal forceOpen />
}
