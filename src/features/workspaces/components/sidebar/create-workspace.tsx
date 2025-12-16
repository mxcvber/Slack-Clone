import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Plus } from 'lucide-react'
import { useCreateWorkspaceModal } from '../../store/use-create-workspace-modal'

const CreateWorkspace = () => {
  const { setOpen } = useCreateWorkspaceModal()

  return (
    <DropdownMenuItem className='cursor-pointer' onClick={() => setOpen(true)}>
      <div className='size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-xl rounded-md flex items-center justify-center mr-2'>
        <Plus />
      </div>
      Create a new workspace
    </DropdownMenuItem>
  )
}

export default CreateWorkspace
