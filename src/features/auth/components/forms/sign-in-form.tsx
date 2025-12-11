import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { signInSchema } from '../../schemas'
import FormInput from './form-input'
import { useAuthActions } from '@convex-dev/auth/react'
import React from 'react'
import { AuthProps } from '../../types'

const SignInForm: React.FC<AuthProps> = ({ pending, setAuthError }) => {
  const { signIn } = useAuthActions()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      setAuthError(null)

      await signIn('password', { email: values.email, password: values.password, flow: 'signIn' })
      form.reset()
    } catch (error: any) {
      setAuthError('Invalide email or password')
    }
  }

  const disabled = pending || form.formState.isSubmitting

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
        <FormInput disabled={disabled} control={form.control} name='email' placeholder='Email' type='email' />
        <FormInput disabled={disabled} control={form.control} name='password' placeholder='Password' type='password' />

        <Button type='submit' className='w-full' size='lg' disabled={disabled}>
          Continue
        </Button>
      </form>
    </Form>
  )
}

export default SignInForm
