import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/form-input'
import { toast } from 'sonner'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useCreateChannelModal } from '../../store/use-create-channel-modal'
import { useCreateChannel } from '../../api/use-create-channel'
import { useRouter } from 'next/navigation'
import { defaultFormSchema } from '@/schemas'

const CreateChannelForm = () => {
  const router = useRouter()
  const { mutate, isPending } = useCreateChannel()
  const { setOpen } = useCreateChannelModal()
  const workspaceId = useWorkspaceId()

  const form = useForm<z.infer<typeof defaultFormSchema>>({
    resolver: zodResolver(defaultFormSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(values: z.infer<typeof defaultFormSchema>) {
    try {
      if (!workspaceId) return

      mutate(
        {
          name: values.name,
          workspaceId,
        },
        {
          onSuccess: (id) => {
            router.push(`/workspace/${workspaceId}/channel/${id}`)
            toast.success('Channel created successfully')
            setOpen(false)
            form.reset()
          },
          onError: () => {
            toast.error('Failed to create channel')
          },
        }
      )
    } catch (error: unknown) {
      console.error('CreateChannelForm Error: ', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormInput
          disabled={isPending}
          control={form.control}
          name='name'
          autoFocus
          placeholder='e.g. plan-budget'
          transform={(value) => value.replace(/\s+/g, '-').toLowerCase()}
        />

        <div className='flex justify-end'>
          <Button disabled={isPending}>Create</Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateChannelForm
