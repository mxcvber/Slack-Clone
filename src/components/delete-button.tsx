import { useCurrentMember } from '@/features/members/api/use-current-member'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { TrashIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

interface DeleteButtonProps {
  handleRemove: () => Promise<void>
  disabled: boolean
  title: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ handleRemove, disabled, title }) => {
  const workspaceId = useWorkspaceId()
  const { data } = useCurrentMember({ workspaceId })

  if (data?.role === 'admin')
    return (
      <Button
        onClick={handleRemove}
        disabled={disabled}
        className='flex items-center gap-x-2 px-5 py-6 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600'
      >
        <TrashIcon className='size-4' />
        <p className='text-sm font-semibold'>{title}</p>
      </Button>
    )
}

export default DeleteButton
