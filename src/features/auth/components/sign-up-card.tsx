import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SignInFlow } from '../types'
import SignUpForm from './forms/sign-up-form'
import SocialAuthButtons from './social-auth-buttons'
import { useAuthActions } from '@convex-dev/auth/react'
import { useState } from 'react'
import AuthError from './auth-error'
import Header from './header'

interface SignUpCardProps {
  setState: (state: SignInFlow) => void
}

const SignUpCard: React.FC<SignUpCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions()

  const [authError, setAuthError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const onProviderSignUp = (value: 'github' | 'google') => {
    setPending(true)
    signIn(value).finally(() => {
      setPending(false)
    })
  }

  return (
    <Card className='md:h-auto md:w-[420px] p-8'>
      <Header title='Sign up to continue' />
      {!!authError && <AuthError error={authError} />}
      <CardContent className='space-y-5 px-0 pb-0'>
        <SignUpForm pending={pending} setAuthError={setAuthError} />
        <Separator />
        <SocialAuthButtons handleProviderAuth={onProviderSignUp} pending={pending} />

        <p className='text-sm text-muted-foreground'>
          Already have an account?{' '}
          <span onClick={() => setState('signIn')} className='text-sky-700 hover:underline cursor-pointer'>
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignUpCard
