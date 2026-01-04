import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const Header = ({ workspaceName }: { workspaceName: string }) => {
  return (
    <DialogHeader>
      <DialogTitle className='break-all'>Invite people to your {workspaceName}</DialogTitle>
      <DialogDescription>Use the code below to invite people to your workspace</DialogDescription>
    </DialogHeader>
  )
}

export default Header
