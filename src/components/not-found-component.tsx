import { Triangle } from 'lucide-react'

const NotFoundComponent = ({ label }: { label: string }) => {
  return (
    <div className='h-full flex-1 flex flex-col gap-y-2 items-center justify-center'>
      <Triangle className='size-6 text-muted-foreground' />
      <span className='text-sm text-muted-foreground'>{label}</span>
    </div>
  )
}

export default NotFoundComponent
