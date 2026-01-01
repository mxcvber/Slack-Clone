import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/form-input'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal'
import { useCreateWorkspace } from '@/features/workspaces/api/use-create-workspace'
import { defaultFormSchema } from '@/schemas'

const WorkspaceModalForm = () => {
  const { setOpen } = useCreateWorkspaceModal()
  const { mutate } = useCreateWorkspace()

  const router = useRouter()

  const form = useForm<z.infer<typeof defaultFormSchema>>({
    resolver: zodResolver(defaultFormSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(values: z.infer<typeof defaultFormSchema>) {
    try {
      mutate(
        {
          name: values.name,
        },
        {
          onSuccess: (id) => {
            router.push(`/workspace/${id}`)
            toast.success('Workspace created successfully')
            setOpen(false)
          },
        }
      )
    } catch (error: any) {
      toast.error('Failed to create workspace.')
      console.error('WorkspaceModalForm Error:')
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormInput
          autoFocus
          disabled={false}
          control={form.control}
          name='name'
          placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
        />

        <div className='flex justify-end'>
          <Button type='submit' disabled={false}>
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default WorkspaceModalForm
