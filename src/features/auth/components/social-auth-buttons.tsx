import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useAuthActions } from '@convex-dev/auth/react'

const SocialAuthButtons = () => {
  const { signIn } = useAuthActions()

  const handleProvideSignIn = (value: 'github' | 'google') => {
    signIn(value)
  }

  return (
    <div className='flex flex-col gap-y-2.5'>
      <Button disabled={false} onClick={() => {}} variant='outline' size='lg' className='w-full relative'>
        <FcGoogle className='size-5 absolute top-1/2 -translate-y-1/2 left-2.5' />
        Continue with Google
      </Button>
      <Button
        disabled={false}
        onClick={() => handleProvideSignIn('github')}
        variant='outline'
        size='lg'
        className='w-full relative'
      >
        <FaGithub className='size-5 absolute top-1/2 -translate-y-1/2 left-2.5' />
        Continue with GitHub
      </Button>
    </div>
  )
}

export default SocialAuthButtons
