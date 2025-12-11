import { TriangleAlert } from 'lucide-react'

const AuthError = ({ error }: { error: string }) => {
  return (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
      <TriangleAlert className='size-4' />
      <p>{error}</p>
    </div>
  )
}

export default AuthError
