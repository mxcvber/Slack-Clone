import { MailIcon } from 'lucide-react'
import Link from 'next/link'
import { Member } from '../../types'

const MemberInfo = ({ member }: { member: Member }) => {
  return (
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
  )
}

export default MemberInfo
