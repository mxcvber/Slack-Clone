import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { signUpSchema } from '../../schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { AuthProps } from '../../types'
import { useAuthActions } from '@convex-dev/auth/react'
import FormInput from '@/components/form-input'

const SignUpForm: React.FC<AuthProps> = ({ pending, setAuthError }) => {
  const { signIn } = useAuthActions()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      setAuthError(null)

      if (values.password !== values.confirmPassword) {
        setAuthError('Passwords do not match')
        return
      }

      await signIn('password', { email: values.email, password: values.password, flow: 'signUp' })
      form.reset()
    } catch (error: any) {
      setAuthError('Something went wrong')
    }
  }

  const disabled = pending || form.formState.isSubmitting

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
        <FormInput disabled={disabled} control={form.control} name='email' placeholder='Email' type='email' />
        <FormInput disabled={disabled} control={form.control} name='password' placeholder='Password' type='password' />
        <FormInput
          disabled={disabled}
          control={form.control}
          name='confirmPassword'
          placeholder='Confirm password'
          type='password'
        />

        <Button type='submit' className='w-full' size='lg' disabled={disabled}>
          Continue
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm
