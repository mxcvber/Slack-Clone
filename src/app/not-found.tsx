import { Button } from '@/components/ui/button'
import Link from 'next/link'

const NotFound = () => {
  return (
    <main className='h-screen flex flex-col space-y-4 items-center justify-center'>
      <h1 className='text-2xl font-semibold'>404 &ndash; Page Not Found</h1>
      <p className='text-muted-foreground'>The page you are looking for doesn&apos;t exist.</p>
      <Button className='w-48' asChild>
        <Link href='/'>Home</Link>
      </Button>
    </main>
  )
}

export default NotFound
