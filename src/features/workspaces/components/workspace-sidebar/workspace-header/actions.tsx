import Hint from '@/components/hint'
import { Button } from '@/components/ui/button'
import { ListFilter, SquarePen } from 'lucide-react'

const Actions = () => {
  return (
    <div className='flex items-center gap-0.5 shrink-0'>
      <Hint label='Filter conversations' side='bottom'>
        <Button variant='transparent' size='icon-sm'>
          <ListFilter className='size-4' />
        </Button>
      </Hint>

      <Hint label='New message' side='bottom'>
        <Button variant='transparent' size='icon-sm'>
          <SquarePen className='size-4' />
        </Button>
      </Hint>
    </div>
  )
}

export default Actions
