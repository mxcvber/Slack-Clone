import { GithubIcon, GoogleIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import React from 'react'

interface SocialAuthButtonsProps {
  pending: boolean
  handleProviderAuth: (value: 'github' | 'google') => void
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ pending, handleProviderAuth }) => {
  return (
    <div className='flex flex-col gap-y-2.5'>
      <Button
        disabled={pending}
        onClick={() => handleProviderAuth('google')}
        variant='outline'
        size='lg'
        className='w-full relative'
      >
        <GoogleIcon className='size-5 absolute top-1/2 -translate-y-1/2 left-2.5' />
        Continue with Google
      </Button>

      <Button
        disabled={pending}
        onClick={() => handleProviderAuth('github')}
        variant='outline'
        size='lg'
        className='w-full relative'
      >
        <GithubIcon className='size-5.5 absolute top-1/2 -translate-y-1/2 left-2.5' />
        Continue with GitHub
      </Button>
    </div>
  )
}

export default SocialAuthButtons
