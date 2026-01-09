import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FaChevronDown } from 'react-icons/fa'
import RenameChannelForm from '../forms/rename-channel-form'
import React, { useState } from 'react'
import { useChannelId } from '../../hooks/use-channel-id'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useRemoveChannel } from '../../api/use-remove-channel'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import EditModal from '@/components/edit-modal'
import DeleteButton from '@/components/delete-button'

interface ChannelModalProps {
  name: string
  confirm: () => Promise<boolean>
}

const ChannelModal: React.FC<ChannelModalProps> = ({ name, confirm }) => {
  const workspaceId = useWorkspaceId()
  const channelId = useChannelId()
  const [modalOpen, setModalOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const { mutate, isPending } = useRemoveChannel()

  const router = useRouter()

  const handleDetete = async () => {
    if (!channelId || !workspaceId) return

    const ok = await confirm()

    if (!ok) return

    mutate(
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

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='text-lg font-semibold px-2 overflow-hidden w-auto' size='sm'>
          <span className='truncate'># {name}</span>
          <FaChevronDown className='size-2.5 ml-2' />
        </Button>
      </DialogTrigger>

      <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
        <DialogHeader className='p-4 border-b bg-white'>
          <DialogTitle className='truncate w-60'># {name}</DialogTitle>
        </DialogHeader>

        <div className='px-4 pb-4 flex flex-col gap-y-2'>
          <EditModal
            editOpen={editOpen}
            handleEditOpen={() => setEditOpen((value) => !value)}
            label='Channel name'
            name={`# ${name}`}
            title='Rename this channel'
          >
            <RenameChannelForm title={name} setEditOpen={setEditOpen} onModalClose={() => setModalOpen(false)} />
          </EditModal>

          <DeleteButton disabled={isPending} handleRemove={handleDetete} title='Delete channel' />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChannelModal
