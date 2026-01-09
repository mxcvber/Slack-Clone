import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/form-input'
import { toast } from 'sonner'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { useUpdateChannel } from '../../api/use-update-channel'
import { defaultFormSchema } from '@/schemas'
import { useChannelId } from '../../hooks/use-channel-id'
import React, { Dispatch, SetStateAction } from 'react'

interface RenameChannelFormProps {
  onModalClose: () => void
  setEditOpen: Dispatch<SetStateAction<boolean>>
  title: string
}

const RenameChannelForm: React.FC<RenameChannelFormProps> = ({ setEditOpen, title, onModalClose }) => {
  const channelId = useChannelId()
  const { mutate, isPending } = useUpdateChannel()

  const form = useForm<z.infer<typeof defaultFormSchema>>({
    resolver: zodResolver(defaultFormSchema),
    defaultValues: {
      name: title,
    },
  })

  async function onSubmit(values: z.infer<typeof defaultFormSchema>) {
    try {
      if (!channelId) return

      mutate(
        {
          id: channelId,
          name: values.name,
        },
        {
          onSuccess: () => {
            toast.success('Channel updated successfully')
            setEditOpen(false)
            onModalClose()
          },
          onError: () => {
            toast.error('Failed to update channel')
          },
        }
      )
    } catch (error: unknown) {
      console.error('RenameChannelForm Error: ', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormInput
          onChange
          disabled={isPending}
          control={form.control}
          name='name'
          autoFocus
          placeholder='e.g. plan-budget'
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending}>Save</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default RenameChannelForm
