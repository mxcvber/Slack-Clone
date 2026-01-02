import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useCurrentMember } from '@/features/members/api/use-current-member'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'

interface EditModalProps {
  editOpen: boolean
  handleEditOpen: Dispatch<SetStateAction<boolean>>
  title: string
  label: string
  name: string
  children: ReactNode
}

const EditModal: React.FC<EditModalProps> = ({ children, editOpen, handleEditOpen, label, name, title }) => {
  const workspaceId = useWorkspaceId()
  const { data: member } = useCurrentMember({ workspaceId })

  return (
    <Dialog open={editOpen} onOpenChange={handleEditOpen}>
      <DialogTrigger asChild>
        <div className='px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-semibold'>{label}</p>
            {member?.role === 'admin' && <p className='text-sm text-[#1264a3] hover:underline font-semibold'>Edit</p>}
          </div>
          <p className='text-sm break-all'>{name}</p>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  )
}

export default EditModal
