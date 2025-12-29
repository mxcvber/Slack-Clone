import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SignInFlow } from '../types'
import SignInForm from './forms/sign-in-form'
import SocialAuthButtons from './social-auth-buttons'
import { useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import AuthError from './auth-error'
import Header from './header'

interface SignInCardProps {
  setState: (state: SignInFlow) => void
}

const SignInCard: React.FC<SignInCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions()

  const [authError, setAuthError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const onProviderSignIn = async (value: 'github' | 'google') => {
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
    <Card className='md:h-auto md:w-[420px] p-8'>
      <Header title='Login to continue' />
      {!!authError && <AuthError error={authError} />}

      <CardContent className='space-y-5 px-0 pb-0'>
        <SignInForm pending={pending} setPending={setPending} setAuthError={setAuthError} />
        <Separator />
        <SocialAuthButtons handleProviderAuth={onProviderSignIn} pending={pending} />

        <p className='text-sm text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <span onClick={() => setState('signUp')} className='text-sky-700 hover:underline cursor-pointer'>
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignInCard
