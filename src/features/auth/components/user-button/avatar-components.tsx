import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader } from 'lucide-react'
import { useCurrentUser } from '../../api/use-current-user'

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
    <Avatar className='rounded-md size-10 hover:opacity-75 transition'>
      <AvatarImage className='rounded-md' alt={name} src={image} />
      <AvatarFallback className='rounded-md bg-sky-500 text-white'>{avatarFallback}</AvatarFallback>
    </Avatar>
  )
}

export default AvatarComponents
