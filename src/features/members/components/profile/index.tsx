import React from 'react'
import { useGetMember } from '../../api/use-get-member'
import { Id } from '../../../../../convex/_generated/dataModel'
import ThreadHeader from '@/features/messages/components/thread-header'
import Loading from '@/components/loading'
import NotFoundComponent from '@/components/not-found-component'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ChevronDownIcon, MailIcon } from 'lucide-react'
import Link from 'next/link'
import { useUpdateMember } from '../../api/use-update-member'
import { useRemoveMember } from '../../api/use-remove-member'
import { useCurrentMember } from '../../api/use-current-member'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import useConfirm from '@/hooks/use-confirm'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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

  const router = useRouter()

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

  const onLeaveWorkspace = async () => {
    const ok = await confirmLeave()
    if (!ok) return

    removeMember(
      { id: memberId },
      {
        onSuccess: () => {
          router.replace('/')
          onClose()
          toast.success('You have left the workspace')
        },
        onError: () => {
          toast.error(`Error leaving workspace`)
        },
      },
    )
  }

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

  const avatarFallback = member.user.name?.[0]?.toUpperCase() ?? 'M'

  return (
    <>
      <RemoveDialog />
      <LeaveDialog />
      <UpdateDialog />
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
          {currentMember?.role === 'admin' && currentMember._id !== member._id ? (
            <div className='flex items-center gap-2 mt-4'>
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

              <Button onClick={onRemoveMember} variant='outline' className='w-1/2'>
                Remove
              </Button>
            </div>
          ) : currentMember?.role !== 'admin' && currentMember?._id === member._id ? (
            <div className='mt-4'>
              <Button onClick={onLeaveWorkspace} variant='outline' className='w-full'>
                Leave
              </Button>
            </div>
          ) : null}
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
    </>
  )
}

export default Profile
