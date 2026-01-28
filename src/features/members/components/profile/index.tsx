import React from 'react'
import { useGetMember } from '../../api/use-get-member'
import { Id } from '../../../../../convex/_generated/dataModel'
import ThreadHeader from '@/features/messages/components/thread-header'
import Loading from '@/components/loading'
import NotFoundComponent from '@/components/not-found-component'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { MailIcon } from 'lucide-react'
import Link from 'next/link'
interface ProfileProps {
  memberId: Id<'members'>
  onClose: () => void
}

const Profile: React.FC<ProfileProps> = ({ memberId, onClose }) => {
  const { data: member, isLoading: isMemberLoading } = useGetMember({ id: memberId })

  if (isMemberLoading) {
    return (
      <div className='h-full flex flex-col'>
        <ThreadHeader title='Profile' onClose={onClose} />
        <Loading />
      </div>
    )
  }

  if (!member) {
    return (
      <div className='h-full flex flex-col'>
        <ThreadHeader title='Profile' onClose={onClose} />
        <NotFoundComponent label='Profile not found' />
      </div>
    )
  }

  const avatarFallback = member.user.name?.[0]?.toUpperCase() ?? 'M'

  return (
    <div className='h-full flex flex-col'>
      <ThreadHeader title='Profile' onClose={onClose} />

      <div className='flex flex-col items-center justify-center p-4'>
        <Avatar className='max-w-64 max-h-64 size-full'>
          <AvatarImage className='aspect-square' src={member.user.image} />
          <AvatarFallback className='aspect-square text-6xl'>{avatarFallback}</AvatarFallback>
        </Avatar>
      </div>

      <div className='flex flex-col p-4'>
        <p className='text-xl font-bold'>{member.user.name}</p>
      </div>

      <Separator />

      <div className='flex flex-col p-4'>
        <p className='text-sm font-bold mb-4'>Contact information</p>

        <div className='flex items-center gap-2'>
          <div className='size-9 rounded-md bg-muted flex items-center justify-center'>
            <MailIcon className='size-4' />
          </div>

          <div className='flex flex-col'>
            <p className='text-[13px] font-semibold text-muted-foreground'>Email Address</p>
            <Link href={`mailto:${member.user.email}`} className='text-sm text-[#1264a3] hover:underline'>
              {member.user.email}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
