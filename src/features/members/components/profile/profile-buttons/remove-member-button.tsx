import { removeMember } from '@/features/members/types'
import React from 'react'
import { Id } from '../../../../../../convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface RemoveMemberButtonProps {
  memberId: Id<'members'>
  onClose: () => void
  removeMember: removeMember
  confirmRemove: () => Promise<boolean>
}

const RemoveMemberButton: React.FC<RemoveMemberButtonProps> = ({ confirmRemove, memberId, onClose, removeMember }) => {
  const onRemoveMember = async () => {
    const ok = await confirmRemove()
    if (!ok) return

    removeMember(
      { id: memberId },
      {
        onSuccess: () => {
          onClose()
          toast.success('Member removed successfully')
        },
        onError: () => {
          toast.error(`Error removing member, you can't remove admins`)
        },
      },
    )
  }

  return (
    <Button onClick={onRemoveMember} variant='outline' className='w-1/2'>
      Remove
    </Button>
  )
}

export default RemoveMemberButton
