import React from 'react'
import { Doc, Id } from '../../../convex/_generated/dataModel'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useCurrentMember } from '@/features/members/api/use-current-member'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import Hint from '../hint'
import EmojiPopover from '../emoji-popover'
import { MdOutlineAddReaction } from 'react-icons/md'

interface ReactionsProps {
  data: Array<
    Omit<Doc<'reactions'>, 'memberId'> & {
      count: number
      memberIds: Id<'members'>[]
    }
  >
  onChange: (value: string) => void
}

const Reactions: React.FC<ReactionsProps> = ({ data, onChange }) => {
  const workspaceId = useWorkspaceId()
  const { data: currentMember } = useCurrentMember({ workspaceId })

  const currentMemberId = currentMember?._id

  if (data.length === 0 || !currentMemberId) {
    return null
  }

  return (
    <div className='flex items-center gap-1 my-1'>
      {data.map((reaction) => (
        <Hint
          key={reaction._id}
          label={`${reaction.count} ${reaction.count === 1 ? 'person' : 'people'} reacted with ${reaction.value}`}
        >
          <Button
            onClick={() => onChange(reaction.value)}
            className={cn(
              'h-6 px-2 rounded-full bg-slate-200/70 hover:bg-slate-200/70 border border-transparent text-slate-800 flex items-center gap-x-1',
              reaction.memberIds.includes(currentMemberId) && 'bg-blue-100/70 border-blue-500 hover:bg-blue-100/70'
            )}
          >
            {reaction.value}
            <span
              className={cn(
                'text-xs font-semibold text-muted-foreground',
                reaction.memberIds.includes(currentMemberId) && 'text-blue-500'
              )}
            >
              {reaction.count}
            </span>
          </Button>
        </Hint>
      ))}

      <EmojiPopover hint='Add reaction' onEmojiSelect={(emoji) => onChange(emoji.native)}>
        <Button className='h-6 px-2 rounded-full bg-slate-200/70 border border-transparent hover:bg-slate-200/70 hover:border-slate-500 text-slate-800 flex items-center gap-x-1'>
          <MdOutlineAddReaction className='size-4' />
        </Button>
      </EmojiPopover>
    </div>
  )
}

export default Reactions
