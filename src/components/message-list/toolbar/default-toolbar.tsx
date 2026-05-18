import EmojiPopover from '@/components/emoji-popover'
import Hint from '@/components/hint'
import { Button } from '@/components/ui/button'
import { ToolbarProps } from '@/types'
import { MessageSquareTextIcon, Pencil, Smile, Trash } from 'lucide-react'

const DefaultToolbar: React.FC<ToolbarProps> = ({
  isAuthor,
  isPending,
  handleEdit,
  handleThread,
  handleDelete,
  handleReaction,
  hideThreadButton,
}) => {
  return (
    <div className='hidden lg:block border bg-white rounded-md shadow-sm lg:group-hover:opacity-100 lg:opacity-0 transition-opacity'>
      <EmojiPopover hint='Add reaction' onEmojiSelect={(emoji) => handleReaction(emoji)}>
        <Button variant='ghost' size='icon-sm' disabled={isPending}>
          <Smile className='size-4' />
        </Button>
      </EmojiPopover>

      {!hideThreadButton && (
        <Hint label='Reply in thread'>
          <Button onClick={handleThread} variant='ghost' size='icon-sm' disabled={isPending}>
            <MessageSquareTextIcon className='size-4' />
          </Button>
        </Hint>
      )}

      {isAuthor && (
        <Hint label='Edit message'>
          <Button onClick={handleEdit} variant='ghost' size='icon-sm' disabled={isPending}>
            <Pencil className='size-4' />
          </Button>
        </Hint>
      )}

      {isAuthor && (
        <Hint label='Delete message'>
          <Button onClick={handleDelete} variant='ghost' size='icon-sm' disabled={isPending}>
            <Trash className='size-4' />
          </Button>
        </Hint>
      )}
    </div>
  )
}

export default DefaultToolbar
