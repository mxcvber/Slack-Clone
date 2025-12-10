import { Button } from '@/components/ui/button'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

interface SocialAuthButtonsProps {
  pending: boolean
  onProviderSignIn: (value: 'github' | 'google') => void
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ pending, onProviderSignIn }) => {
  return (
    <div className='flex flex-col gap-y-2.5'>
      <Button
        disabled={pending}
        onClick={() => onProviderSignIn('google')}
        variant='outline'
        size='lg'
        className='w-full relative'
      >
        <FcGoogle className='size-5 absolute top-1/2 -translate-y-1/2 left-2.5' />
        Continue with Google
      </Button>
      <Button
        disabled={pending}
        onClick={() => onProviderSignIn('github')}
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
