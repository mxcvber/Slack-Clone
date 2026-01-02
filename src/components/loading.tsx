import { Loader } from 'lucide-react'

const Loading = () => {
  return (
    <div className='h-full flex-1 flex items-center justify-center'>
      <Loader className='animate-spin size-6 text-muted-foreground' />
    </div>
  )
}

export default Loading
