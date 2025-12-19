import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { TrashIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useRemoveWorkspace } from '../../api/use-remove-workspace'
import { useWorkspaceId } from '../../hooks/use-workspace-id'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import PreferencesEditModal from './preferences-edit-modal'
import useConfirm from '../../hooks/use-confirm'

interface PreferencesModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  initialValue: string
}

const PreferencesModal: React.FC<PreferencesModalProps> = ({ open, setOpen, initialValue }) => {
  const router = useRouter()
  const [value, setValue] = useState(initialValue)

  const [ConfirmDialog, confirm] = useConfirm('Are you sure?', 'This action is irreversible.')
  const workspaceId = useWorkspaceId()
  const { mutate, isPending } = useRemoveWorkspace()

  const handleRemove = async () => {
    const ok = await confirm()
    if (!ok) return

    mutate(
      {
        workspaceId,
      },
      {
        onSuccess: () => {
          router.replace('/')
          toast.success('Workspace removed successfully')
        },
        onError: () => {
          toast.error('Failed to remove workspace')
        },
      }
    )
  }

  return (
    <>
      <ConfirmDialog />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
          <DialogHeader className='p-4 border-b bg-white'>
            <DialogTitle>{value}</DialogTitle>
          </DialogHeader>

          <div className='px-4 pb-4 flex flex-col gap-y-2'>
            <PreferencesEditModal value={value} setValue={setValue} />

            <button
              disabled={isPending}
              onClick={handleRemove}
              className='flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600'
            >
              <TrashIcon className='size-4' />
              <p className='text-sm font-semibold'>Delete workspace</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PreferencesModal
