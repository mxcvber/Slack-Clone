import z from 'zod'

export const signInSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email address'),
  password: z.string().nonempty('Password is required'),
})

export const signUpSchema = signInSchema.extend({
  name: z
    .string()
    .nonempty('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(60, 'Name must be at most 60 characters'),
  confirmPassword: z.string().nonempty('Confirm password is required'),
})
