import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useCreateChannelModal } from '../../store/use-create-channel-modal'
import CreateChannelForm from '../forms/create-channel-form'

const CreateChannelModal = () => {
  const { open, setOpen } = useCreateChannelModal()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <CreateChannelForm />
      </DialogContent>
    </Dialog>
  )
}

export default CreateChannelModal
