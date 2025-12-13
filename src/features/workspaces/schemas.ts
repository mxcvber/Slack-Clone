import z from 'zod'

export const workspaceModalSchema = z.object({
  name: z.string().nonempty('Workspace name is required').min(3, 'minimum 3 characters'),
})
