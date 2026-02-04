import React from 'react'
import { Id } from '../../../../../../convex/_generated/dataModel'
import { currentMember, Member, removeMember, updateMember } from '../../../types'
import UpdateRoleButton from './update-role-button'
import RemoveMemberButton from './remove-member-button'
import LeaveButton from './leave-button'

interface ProfileButtonsProps {
  member: Member
  currentMember: currentMember
  memberId: Id<'members'>
  updateMember: updateMember
  removeMember: removeMember
  confirmUpdate: () => Promise<boolean>
  confirmRemove: () => Promise<boolean>
  confirmLeave: () => Promise<boolean>
  onClose: () => void
}

const ProfileButtons: React.FC<ProfileButtonsProps> = ({
  member,
  currentMember,
  memberId,
  updateMember,
  removeMember,
  confirmUpdate,
  confirmRemove,
  confirmLeave,
  onClose,
}) => {
  return (
    <div className='flex flex-col p-4'>
      <p className='text-xl font-bold'>{member.user.name}</p>

      {currentMember?.role === 'admin' && currentMember._id !== member._id ? (
        <div className='flex items-center gap-2 mt-4'>
          <UpdateRoleButton
            member={member}
            confirmUpdate={confirmUpdate}
            memberId={memberId}
            onClose={onClose}
            updateMember={updateMember}
          />

          <RemoveMemberButton
            confirmRemove={confirmRemove}
            memberId={memberId}
            onClose={onClose}
            removeMember={removeMember}
          />
        </div>
      ) : currentMember?.role !== 'admin' && currentMember?._id === member._id ? (
        <LeaveButton confirmLeave={confirmLeave} memberId={memberId} onClose={onClose} removeMember={removeMember} />
      ) : null}
    </div>
  )
}

export default ProfileButtons
