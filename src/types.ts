import { Doc, Id } from '../convex/_generated/dataModel'

type EditorValue = {
  image: File | null
  body: string
}

export type DefaultEditorType = {
  onSubmit: ({ image, body }: EditorValue) => void
  onCancel?: () => void
}

export type DefaultMessageType = {
  body: Doc<'messages'>['body']
  image: string | null | undefined
  isEditing: boolean
  createdAt: Doc<'messages'>['_creationTime']
  updatedAt: Doc<'messages'>['updatedAt']
  setEditingId: (id: Id<'messages'> | null) => void
  reactions: Array<
    Omit<Doc<'reactions'>, 'memberId'> & {
      count: number
      memberIds: Id<'members'>[]
    }
  >
  threadCount?: number
  threadImage?: string
  threadName?: string
  threadTimestamp?: number
}
