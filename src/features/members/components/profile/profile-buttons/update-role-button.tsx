import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Member, updateMember } from '@/features/members/types'
import { ChevronDownIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { Id } from '../../../../../../convex/_generated/dataModel'

interface UpdateRoleButton {
  member: Member
  memberId: Id<'members'>
  onClose: () => void
  updateMember: updateMember
  confirmUpdate: () => Promise<boolean>
}

const UpdateRoleButton: React.FC<UpdateRoleButton> = ({ member, memberId, onClose, updateMember, confirmUpdate }) => {
  const onUpdateRole = async (role: 'admin' | 'member') => {
    const ok = await confirmUpdate()
    if (!ok) return

    updateMember(
      { id: memberId, role },
      {
        onSuccess: () => {
          onClose()
          toast.success('Member role updated successfully')
        },
        onError: () => {
          toast.error(`Error updating member role`)
        },
      },
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='w-1/2 capitalize'>
          {member.role} <ChevronDownIcon className='size-4 ml-2' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-full'>
        <DropdownMenuRadioGroup
          value={member.role}
          onValueChange={(value) => onUpdateRole(value as 'admin' | 'member')}
        >
          <DropdownMenuRadioItem value='admin'>Admin</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='member'>Member</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UpdateRoleButton
