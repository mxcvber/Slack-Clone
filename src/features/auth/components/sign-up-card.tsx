import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SignInFlow } from '../types'
import SignUpForm from './forms/sign-up-form'
import SocialAuthButtons from './social-auth-buttons'

interface SignUpCardProps {
  setState: (state: SignInFlow) => void
}

const SignUpCard: React.FC<SignUpCardProps> = ({ setState }) => {
  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5 px-0 pb-0'>
        <SignUpForm />
        <Separator />
        <SocialAuthButtons />

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
