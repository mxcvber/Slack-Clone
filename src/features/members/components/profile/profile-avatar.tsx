import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Member } from '../../types'

const ProfileAvatar = ({ member }: { member: Member }) => {
  const avatarFallback = member.user.name?.[0]?.toUpperCase() ?? 'M'

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <Avatar className='max-w-64 max-h-64 size-full'>
        <AvatarImage className='aspect-square' src={member.user.image} />
        <AvatarFallback className='aspect-square text-6xl'>{avatarFallback}</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default ProfileAvatar
