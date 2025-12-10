import z from 'zod'

export const signInSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email address'),
  password: z
    .string()
    .nonempty('Message is required')
    .min(6, 'Password must be at least 6 characters')
    .max(60, 'Password must be at most 60 characters'),
})

export const signUpSchema = signInSchema
  .extend({
    confirmPassword: z.string().nonempty('Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
