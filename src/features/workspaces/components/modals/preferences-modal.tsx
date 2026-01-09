import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { useRemoveWorkspace } from '../../api/use-remove-workspace'
import { useWorkspaceId } from '../../hooks/use-workspace-id'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import useConfirm from '@/hooks/use-confirm'
import EditModal from '@/components/edit-modal'
import PreferencesEditForm from './forms/preferences-edit-form'
import DeleteButton from '@/components/delete-button'

interface PreferencesModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  initialValue: string
}

const PreferencesModal: React.FC<PreferencesModalProps> = ({ open, setOpen, initialValue }) => {
  const workspaceId = useWorkspaceId()

  const [ConfirmDialog, confirm] = useConfirm('Are you sure?', 'This action is irreversible.')
  const { mutate, isPending } = useRemoveWorkspace()

  const [editOpen, setEditOpen] = useState(false)
  const [value, setValue] = useState(initialValue)
  const router = useRouter()

  const handleRemove = async () => {
    if (!workspaceId) return

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
            <DialogTitle className='truncate w-60'>{value}</DialogTitle>
          </DialogHeader>

          <div className='px-4 pb-4 flex flex-col gap-y-2'>
            <EditModal
              editOpen={editOpen}
              handleEditOpen={() => setEditOpen((value) => !value)}
              label='Workspace name'
              name={value}
              title='Rename this workspace'
            >
              <PreferencesEditForm onModalClose={() => setOpen(false)} setEditOpen={setEditOpen} setValue={setValue} />
            </EditModal>

            <DeleteButton disabled={isPending} handleRemove={handleRemove} title='Delete workspace' />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PreferencesModal
