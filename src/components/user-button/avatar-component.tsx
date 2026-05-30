import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { convexAuthNextjsToken } from '@convex-dev/auth/nextjs/server'
import { fetchQuery } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'

const AvatarComponent = async () => {
  const token = await convexAuthNextjsToken()
  const user = await fetchQuery(api.users.current, {}, { token })

  if (!user) {
    return null
  }

  const avatarFallback = user?.name?.charAt(0).toUpperCase()

  return (
    <Avatar className='size-7 sm:size-9 hover:opacity-75 transition'>
      <AvatarImage alt={user?.name} src={user?.image} />
      <AvatarFallback>{avatarFallback}</AvatarFallback>
    </Avatar>
  )
}

export default AvatarComponent
