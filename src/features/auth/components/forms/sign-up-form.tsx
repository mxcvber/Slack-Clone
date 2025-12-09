import { Form } from '@/components/ui/form'
import FormInput from './form-input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { signUpSchema } from '../../shemas'
import { zodResolver } from '@hookform/resolvers/zod'

const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit() {
    try {
      form.reset()
    } catch (error) {
      console.error('Error submitting sign in form', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
        <FormInput control={form.control} name='email' placeholder='Email' type='email' />
        <FormInput control={form.control} name='password' placeholder='Password' type='password' />
        <FormInput control={form.control} name='confirmPassword' placeholder='Confirm password' type='password' />

        <Button type='submit' className='w-full' size='lg' disabled={false}>
          Continue
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm
