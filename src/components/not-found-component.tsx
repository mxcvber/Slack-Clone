import { cn } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'

const NotFoundComponent = ({ label, className }: { label: string; className?: string }) => {
  return (
    <div
      className={cn('h-full flex-1 flex flex-col gap-y-2 items-center justify-center text-muted-foreground', className)}
    >
      <AlertTriangle className='size-4 sm:size-6' />
      <span className='text-xs sm:text-sm'>{label}</span>
    </div>
  )
}

export default NotFoundComponent
