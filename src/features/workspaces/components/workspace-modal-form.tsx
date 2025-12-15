import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { workspaceModalSchema } from '../schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/form-input'
import { useCreateWorkspaces } from '../api/use-create-workspaces'
import { useRouter } from 'next/navigation'
import { useCreateWorkspaceModal } from '../store/use-create-workspace-modal'
import { toast } from 'sonner'

const WorkspaceModalForm = () => {
  const router = useRouter()
  const { setOpen } = useCreateWorkspaceModal()

  const { mutate } = useCreateWorkspaces()
  const form = useForm<z.infer<typeof workspaceModalSchema>>({
    resolver: zodResolver(workspaceModalSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(values: z.infer<typeof workspaceModalSchema>) {
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

      form.reset()
    } catch (error: any) {
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
