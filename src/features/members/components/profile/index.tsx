import React from 'react'
import { useGetMember } from '../../api/use-get-member'
import { Id } from '../../../../../convex/_generated/dataModel'
import ThreadHeader from '@/features/messages/components/thread-header'
import Loading from '@/components/loading'
import NotFoundComponent from '@/components/not-found-component'
import { Separator } from '@/components/ui/separator'
import { useUpdateMember } from '../../api/use-update-member'
import { useRemoveMember } from '../../api/use-remove-member'
import { useCurrentMember } from '../../api/use-current-member'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import useConfirm from '@/hooks/use-confirm'
import ProfileAvatar from './profile-avatar'
import ProfileButtons from './profile-buttons'
import MemberInfo from './member-info'

interface ProfileProps {
  memberId: Id<'members'>
  onClose: () => void
}

const Profile: React.FC<ProfileProps> = ({ memberId, onClose }) => {
  const workspaceId = useWorkspaceId()

  const { data: currentMember, isLoading: isCurrentMemberLoading } = useCurrentMember({ workspaceId })
  const { data: member, isLoading: isMemberLoading } = useGetMember({ id: memberId })
  const { mutate: updateMember, isPending: isUpdatePending } = useUpdateMember()
  const { mutate: removeMember, isPending: isRemovePending } = useRemoveMember()
  const [LeaveDialog, confirmLeave] = useConfirm('Leave workspace', 'Are you sure you want to leave this workspace?')
  const [RemoveDialog, confirmRemove] = useConfirm('Remove member', 'Are you sure you want to remove this member?')
  const [UpdateDialog, confirmUpdate] = useConfirm(
    "Update member's role",
    "Are you sure you want to change this member's role?",
  )

  if (isMemberLoading || isCurrentMemberLoading || isUpdatePending || isRemovePending) {
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

  return (
    <>
      <RemoveDialog />
      <LeaveDialog />
      <UpdateDialog />
      <div className='h-full flex flex-col'>
        <ThreadHeader title='Profile' onClose={onClose} />
        <ProfileAvatar member={member} />

        <ProfileButtons
          updateMember={updateMember}
          removeMember={removeMember}
          confirmUpdate={confirmUpdate}
          confirmRemove={confirmRemove}
          confirmLeave={confirmLeave}
          onClose={onClose}
          memberId={memberId}
          member={member}
          currentMember={currentMember}
        />

        <Separator />
        <MemberInfo member={member} />
      </div>
    </>
  )
}

export default Profile
