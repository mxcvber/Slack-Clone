import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { getAuthUserId } from '@convex-dev/auth/server'

const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)

    if (!userId) {
      throw new Error('Unauthorized')
    }

    const joinCode = generateCode()

    const workspaceId = await ctx.db.insert('workspaces', {
      name: args.name,
      userID: userId,
      joinCode,
    })

    await ctx.db.insert('members', {
      userId,
      workspaceId,
      role: 'admin',
    })

    return workspaceId
  },
})

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) {
      throw []
    }

    const members = await ctx.db
      .query('members')
      .withIndex('by_user_id', (q) => q.eq('userId', userId))
      .collect()

    const workspaceIds = members.map((member) => member.workspaceId)

    const workspaces = []

    for (const workspaceId of workspaceIds) {
      const workspace = await ctx.db.get(workspaceId)

      if (workspace) {
        workspaces.push(workspace)
      }
    }

    return workspaces
  },
})

export const getById = query({
  args: {
    workspaceId: v.id('workspaces'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) {
      throw new Error('Unauthorized')
    }

    const workspace = await ctx.db.get(args.workspaceId)
    if (!workspace) {
      throw new Error('Workspace not found')
    }

    const member = await ctx.db
      .query('members')
      .withIndex('by_user_and_workspace', (q) => q.eq('workspaceId', args.workspaceId).eq('userId', userId))
      .unique()

    if (!member) {
      null
    }

    return workspace
  },
})

export const update = mutation({
  args: {
    workspaceId: v.id('workspaces'),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)

    if (!userId) {
      throw new Error('Unauthorized')
    }

    const member = await ctx.db
      .query('members')
      .withIndex('by_user_and_workspace', (q) => q.eq('workspaceId', args.workspaceId).eq('userId', userId))
      .unique()

    if (!member || member.role !== 'admin') {
      throw new Error('Forbidden')
    }

    await ctx.db.patch(args.workspaceId, {
      name: args.name,
    })

    return args.workspaceId
  },
})

export const remove = mutation({
  args: {
    workspaceId: v.id('workspaces'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)

    if (!userId) {
      throw new Error('Unauthorized')
    }

    const member = await ctx.db
      .query('members')
      .withIndex('by_user_and_workspace', (q) => q.eq('workspaceId', args.workspaceId).eq('userId', userId))
      .unique()

    if (!member || member.role !== 'admin') {
      throw new Error('Forbidden')
    }

    const [members] = await Promise.all([
      ctx.db
        .query('members')
        .withIndex('by_workspace_id', (q) => q.eq('workspaceId', args.workspaceId))
        .collect(),
    ])

    for (const member of members) {
      await ctx.db.delete(member._id)
    }

    await ctx.db.delete(args.workspaceId)

    return args.workspaceId
  },
})
