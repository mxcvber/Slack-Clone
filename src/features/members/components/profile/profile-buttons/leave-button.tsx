import { Button } from '@/components/ui/button'
import React from 'react'
import { Id } from '../../../../../../convex/_generated/dataModel'
import { removeMember } from '@/features/members/types'
import { toast } from 'sonner'

interface LeaveButtonProps {
  memberId: Id<'members'>
  onClose: () => void
  removeMember: removeMember
  confirmLeave: () => Promise<boolean>
}

const LeaveButton: React.FC<LeaveButtonProps> = ({ confirmLeave, memberId, onClose, removeMember }) => {
  const onLeaveWorkspace = async () => {
    const ok = await confirmLeave()
    if (!ok) return

    removeMember(
      { id: memberId },
      {
        onSuccess: () => {
          onClose()
          toast.success('You have left the workspace')
        },
        onError: () => {
          toast.error(`Error leaving workspace`)
        },
      },
    )
  }

  return (
    <div className='mt-4'>
      <Button onClick={onLeaveWorkspace} variant='outline' className='w-full'>
        Leave
      </Button>
    </div>
  )
}

export default LeaveButton
