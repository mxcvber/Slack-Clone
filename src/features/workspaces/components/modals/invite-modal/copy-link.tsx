import { Button } from '@/components/ui/button'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { CopyIcon } from 'lucide-react'
import { toast } from 'sonner'

const CopyLink = ({ joinCode }: { joinCode: string }) => {
  const workspaceId = useWorkspaceId()

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`

    navigator.clipboard.writeText(inviteLink).then(() => toast.success('Invite link copied to clipboard'))
  }

  return (
    <div className='flex flex-col gap-y-4 items-center justify-center py-10'>
      <p className='text-4xl font-bold tracking-widest'>{joinCode}</p>
      <Button onClick={handleCopy} variant='ghost' size='sm'>
        Copy link
        <CopyIcon className='size-4 ml-2' />
      </Button>
    </div>
  )
}

export default CopyLink
