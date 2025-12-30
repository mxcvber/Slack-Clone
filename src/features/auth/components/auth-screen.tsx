'use client'

import { useState } from 'react'
import { SignInFlow } from '../types'
import SignInCard from './sign-in-card'
import SignUpCard from './sign-up-card'
import { useAuthActions } from '@convex-dev/auth/react'

const AuthScreen = () => {
  const { signIn } = useAuthActions()

  const [authError, setAuthError] = useState<string | null>(null)
  const [state, setState] = useState<SignInFlow>('signIn')
  const [pending, setPending] = useState(false)

  const handleProviderAuth = async (value: 'github' | 'google') => {
    if (pending) return

    setPending(true)

    try {
      await signIn(value)
    } catch (err) {
      setAuthError('Authentication failed')
      console.error('Authentication failed:', err)
      setPending(false)
    }
  }

  return (
    <section aria-label='Authentication section' className='h-full flex items-center justify-center bg-[#5c3b58]'>
      {state === 'signIn' ? (
        <SignInCard
          authError={authError}
          setAuthError={setAuthError}
          pending={pending}
          setPending={setPending}
          handleProviderAuth={handleProviderAuth}
          setState={setState}
        />
      ) : (
        <SignUpCard
          authError={authError}
          setAuthError={setAuthError}
          pending={pending}
          setPending={setPending}
          handleProviderAuth={handleProviderAuth}
          setState={setState}
        />
      )}
    </section>
  )
}

export default AuthScreen
