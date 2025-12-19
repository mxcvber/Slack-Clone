import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import PreferencesEditForm from './forms/preferences-edit-form'

interface PreferencesEditModalProps {
  value: string
  setValue: (value: string) => void
}

const PreferencesEditModal: React.FC<PreferencesEditModalProps> = ({ value, setValue }) => {
  const [editOpen, setEditOpen] = useState(false)

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogTrigger asChild>
        <div className='px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-semibold'>Workspace name</p>
            <p className='text-sm text-[#1264a3] hover:underline font-semibold'>Edit</p>
          </div>
          <p className='text-sm'>{value}</p>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename this workspace</DialogTitle>
        </DialogHeader>

        <PreferencesEditForm setEditOpen={setEditOpen} setValue={setValue} />
      </DialogContent>
    </Dialog>
  )
}

export default PreferencesEditModal
