import { useCurrentMember } from '@/features/members/api/use-current-member'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { TrashIcon } from 'lucide-react'
import React from 'react'

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
      <button
        onClick={handleRemove}
        disabled={disabled}
        className='flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600'
      >
        <TrashIcon className='size-4' />
        <p className='text-sm font-semibold'>{title}</p>
      </button>
    )
}

export default DeleteButton
