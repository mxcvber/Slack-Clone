import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'

const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={cn('h-full flex-1 flex items-center justify-center text-muted-foreground', className)}>
      <Loader className='animate-spin size-6' />
    </div>
  )
}

export default Loading
