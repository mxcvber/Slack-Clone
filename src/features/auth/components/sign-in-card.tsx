import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SignInFlow } from '../types'
import SignInForm from './forms/sign-in-form'
import SocialAuthButtons from './social-auth-buttons'

interface SignInCardProps {
  setState: (state: SignInFlow) => void
}

const SignInCard: React.FC<SignInCardProps> = ({ setState }) => {
  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      <CardContent className='space-y-5 px-0 pb-0'>
        <SignInForm />
        <Separator />
        <SocialAuthButtons />

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
