import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'

const ThreadHeader = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className='h-[49px] flex justify-baseline items-center px-4 border-b '>
      <p className='text-lg font-bold'>Thread</p>
      <Button variant='ghost' size='icon-sm' onClick={onClose}>
        <XIcon className='size-5 stroke-[1.5]' />
      </Button>
    </div>
  )
}

export default ThreadHeader
