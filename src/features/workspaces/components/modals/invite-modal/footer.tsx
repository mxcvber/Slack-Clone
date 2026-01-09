import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { useNewJoinCode } from '@/features/join/api/use-new-join-code'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { RefreshCcw } from 'lucide-react'
import { toast } from 'sonner'

const Footer = ({ confirm }: { confirm: () => Promise<boolean> }) => {
  const workspaceId = useWorkspaceId()

  const { mutate, isPending } = useNewJoinCode()

  const handleNewCode = async () => {
    if (!workspaceId) return

    const ok = await confirm()

    if (!ok) return

    mutate(
      { workspaceId },
      {
        onSuccess: () => {
          toast.success('Invite code regenerated')
        },
        onError: () => {
          toast.error('Failed to regenerate invite code')
        },
      }
    )
  }

  return (
    <div className='flex items-center justify-between w-full'>
      <Button disabled={isPending} onClick={handleNewCode} variant='outline'>
        New code
        <RefreshCcw className='size-4 ml-2' />
      </Button>

      <DialogClose asChild>
        <Button>Close</Button>
      </DialogClose>
    </div>
  )
}

export default Footer
