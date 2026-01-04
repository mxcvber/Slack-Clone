import { Dialog, DialogContent } from '@/components/ui/dialog'
import React from 'react'
import useConfirm from '@/hooks/use-confirm'
import Header from './header'
import CopyLink from './copy-link'
import Footer from './footer'

interface InviteModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  name: string
  joinCode: string
}

const InviteModal: React.FC<InviteModalProps> = ({ open, setOpen, joinCode, name }) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'This will diactivate the current invite code and generate a new one.'
  )

  return (
    <>
      <ConfirmDialog />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <Header workspaceName={name} />

          <CopyLink joinCode={joinCode} />

          <Footer confirm={confirm} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default InviteModal
