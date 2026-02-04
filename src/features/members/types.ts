import { Id } from '../../../convex/_generated/dataModel'

export type Member = {
  user: {
    _id: Id<'users'>
    _creationTime: number
    name?: string | undefined | undefined
    email?: string | undefined | undefined
    phone?: string | undefined | undefined
    image?: string | undefined | undefined
    emailVerificationTime?: number | undefined | undefined
    phoneVerificationTime?: number | undefined | undefined
    isAnonymous?: boolean | undefined | undefined
  }
  _id: Id<'members'>
  _creationTime: number
  role: 'member' | 'admin'
  userId: Id<'users'>
  workspaceId: Id<'workspaces'>
}

export type currentMember =
  | {
      _id: Id<'members'>
      _creationTime: number
      userId: Id<'users'>
      workspaceId: Id<'workspaces'>
      role: 'member' | 'admin'
    }
  | null
  | undefined

type RequestRemoveMemberType = {
  id: Id<'members'>
}
type ResponseRemoveMemberType = Id<'members'> | null

type RemoveMemberOptions = {
  onSuccess?: (data: ResponseRemoveMemberType) => void
  onError?: (error: Error) => void
  onSettled?: () => void
  throwError?: boolean
}

export type removeMember = (
  values: RequestRemoveMemberType,
  options?: RemoveMemberOptions,
) => Promise<
  | (string & {
      __tableName: 'members'
    })
  | undefined
>

type RequestUpdateMemberType = {
  id: Id<'members'>
  role: 'admin' | 'member'
}
type ResponseUpdateMemberType = Id<'members'> | null

type UpdateMemberOptions = {
  onSuccess?: (data: ResponseUpdateMemberType) => void
  onError?: (error: Error) => void
  onSettled?: () => void
  throwError?: boolean
}

export type updateMember = (
  values: RequestUpdateMemberType,
  options?: UpdateMemberOptions,
) => Promise<
  | (string & {
      __tableName: 'members'
    })
  | undefined
>
