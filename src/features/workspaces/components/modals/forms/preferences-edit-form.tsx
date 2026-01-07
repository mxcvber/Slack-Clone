import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/form-input'
import { toast } from 'sonner'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useUpdateWorkspace } from '@/features/workspaces/api/use-update-workspace'
import React, { Dispatch, SetStateAction } from 'react'
import { defaultFormSchema } from '@/schemas'

interface PreferencesEditFormProps {
  setEditOpen: Dispatch<SetStateAction<boolean>>
  setValue: Dispatch<SetStateAction<string>>
  onModalClose: () => void
}

const PreferencesEditForm: React.FC<PreferencesEditFormProps> = ({ setEditOpen, setValue, onModalClose }) => {
  const { mutate, isPending } = useUpdateWorkspace()
  const workspaceId = useWorkspaceId()

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
          workspaceId,
          name: values.name,
        },
        {
          onSuccess: () => {
            toast.success('Workspace updated successfully')
            setValue(values.name)
            setEditOpen(false)
            onModalClose()
          },
          onError: () => {
            toast.error('Failed to update workspace')
          },
        }
      )
    } catch (error: unknown) {
      console.error('PreferencesEditForm Error: ', error)
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
          placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending} type='submit'>
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default PreferencesEditForm
