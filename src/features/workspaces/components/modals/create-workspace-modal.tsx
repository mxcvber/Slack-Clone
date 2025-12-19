import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useCreateWorkspaceModal } from '../../store/use-create-workspace-modal'
import WorkspaceModalForm from './forms/workspace-modal-form'

const CreateWorkspaceModal = () => {
  const { open, setOpen } = useCreateWorkspaceModal()

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>

        <WorkspaceModalForm />
      </DialogContent>
    </Dialog>
  )
}

export default CreateWorkspaceModal
