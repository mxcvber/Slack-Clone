import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AuthCardProps } from '../types'
import SignInForm from './forms/sign-in-form'
import SocialAuthButtons from './social-auth-buttons'
import AuthError from './auth-error'
import Header from './header'

const SignInCard: React.FC<AuthCardProps> = ({
  setState,
  authError,
  setAuthError,
  pending,
  setPending,
  handleProviderAuth,
}) => {
  return (
    <Card className='md:h-auto md:w-[420px] p-8'>
      <Header title='Login to continue' />
      {!!authError && <AuthError error={authError} />}

      <CardContent className='space-y-5 px-0 pb-0'>
        <SignInForm pending={pending} setPending={setPending} setAuthError={setAuthError} />
        <Separator />
        <SocialAuthButtons handleProviderAuth={handleProviderAuth} pending={pending} />

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
