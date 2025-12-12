import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCurrentUser } from '../../hooks/use-current-user'
import { Loader } from 'lucide-react'

const AvatarComponents = () => {
  const { data, isLoading } = useCurrentUser()

  if (isLoading) {
    return <Loader className='size-4 animate-spin text-muted-foreground' />
  }

  if (!data) {
    return null
  }

  const { image, name } = data

  const avatarFallback = name!.charAt(0).toUpperCase()

  return (
    <Avatar className='size-10 hover:opacity-75 transition'>
      <AvatarImage alt={name} src={image} />
      <AvatarFallback className='bg-sky-500 text-white'>{avatarFallback}</AvatarFallback>
    </Avatar>
  )
}

export default AvatarComponents
