import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/form-input'
import { toast } from 'sonner'
import { workspaceModalSchema } from '@/features/workspaces/schemas'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { useChannelId } from '@/features/workspaces/hooks/use-channel-id'
import { useUpdateChannel } from '../../api/use-update-channel'

const RenameChannelForm = ({ setEditOpen, title }: { setEditOpen: (value: boolean) => void; title: string }) => {
  const channelId = useChannelId()
  const { mutate: updateChannel, isPending: isUpdatingChannel } = useUpdateChannel()

  const form = useForm<z.infer<typeof workspaceModalSchema>>({
    resolver: zodResolver(workspaceModalSchema),
    defaultValues: {
      name: title,
    },
  })

  async function onSubmit(values: z.infer<typeof workspaceModalSchema>) {
    try {
      updateChannel(
        {
          id: channelId,
          name: values.name,
        },
        {
          onSuccess: () => {
            toast.success('Channel updated successfully')
            setEditOpen(false)
          },
          onError: () => {
            toast.error('Failed to update channel')
          },
        }
      )
    } catch (error: any) {
      console.error('RenameChannelForm Error: ', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormInput
          onChange
          disabled={isUpdatingChannel}
          control={form.control}
          name='name'
          autoFocus
          placeholder='e.g. plan-budget'
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' disabled={isUpdatingChannel}>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isUpdatingChannel}>Save</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default RenameChannelForm
