import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { signInSchema } from '../../schemas'
import FormInput from './form-input'

const SignInForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
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

        <Button type='submit' className='w-full' size='lg' disabled={false}>
          Continue
        </Button>
      </form>
    </Form>
  )
}

export default SignInForm
