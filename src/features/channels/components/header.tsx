import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { TrashIcon } from 'lucide-react'
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import RenameChannelForm from './forms/rename-channel-form'
import { useRemoveChannel } from '../api/use-remove-channel'
import useConfirm from '@/features/workspaces/hooks/use-confirm'
import { useChannelId } from '@/features/workspaces/hooks/use-channel-id'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useCurrentMember } from '@/features/members/api/use-current-member'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter()
  const channelId = useChannelId()
  const workspaceId = useWorkspaceId()
  const { data: member } = useCurrentMember({ workspaceId })
  const { mutate: removeChannel, isPending: isRemovingChannel } = useRemoveChannel()
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete this channel?',
    'You are about to delete this channel. This action is irreversible.'
  )

  const [editOpen, setEditOpen] = useState(false)

  const handleDetete = async () => {
    const ok = await confirm()

    if (!ok) return

    removeChannel(
      { id: channelId },
      {
        onSuccess: () => {
          toast.success('Channel deleted')
          router.push(`/workspace/${workspaceId}`)
        },
        onError: () => {
          toast.error('Failed to delete channel')
        },
      }
    )
  }

  const handleEditOpen = () => {
    if (member?.role !== 'admin') return

    setEditOpen(true)
  }

  return (
    <div className='bg-white border-b h-[49px] flex items-center px-4 overflow-hidden'>
      <ConfirmDialog />

      <Dialog>
        <DialogTrigger asChild>
          <Button variant='ghost' className='text-lg font-semibold px-2 overflow-hidden w-auto' size='sm'>
            <span className='truncate'># {title}</span>
            <FaChevronDown className='size-2.5 ml-2' />
          </Button>
        </DialogTrigger>
        <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
          <DialogHeader className='p-4 border-b bg-white'>
            <DialogTitle># {title}</DialogTitle>
          </DialogHeader>
          <div className='px-4 pb-4 flex flex-col gap-y-2'>
            <Dialog open={editOpen} onOpenChange={handleEditOpen}>
              <DialogTrigger asChild>
                <div className='px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm font-semibold'>Channel name</p>
                    {member?.role === 'admin' && (
                      <p className='text-sm text-[#1264a3] hover:underline font-semibold'>Edit</p>
                    )}
                  </div>
                  <p className='text-sm'># {title}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this channel</DialogTitle>
                </DialogHeader>

                <RenameChannelForm title={title} setEditOpen={setEditOpen} />
              </DialogContent>
            </Dialog>
            {member?.role === 'admin' && (
              <button
                onClick={handleDetete}
                disabled={isRemovingChannel}
                className='flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600'
              >
                <TrashIcon className='size-4' />
                <p className='text-sm font-semibold'>Delete channel</p>
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header
