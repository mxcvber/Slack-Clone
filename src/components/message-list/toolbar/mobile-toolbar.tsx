import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Ellipsis, MessageSquareTextIcon, Pencil, Smile, Trash } from 'lucide-react'
import EmojiPopover from '../../emoji-popover'
import { Button } from '../../ui/button'
import Hint from '../../hint'
import { ToolbarProps } from '@/types'

const MobileToolbar: React.FC<ToolbarProps> = ({
  isAuthor,
  isPending,
  handleEdit,
  handleThread,
  handleDelete,
  handleReaction,
  hideThreadButton,
}) => {
  return (
    <div className='block lg:hidden'>
      <Popover>
        <PopoverTrigger>
          <Ellipsis className='size-5 sm:size-6' />
        </PopoverTrigger>

        <PopoverContent className='w-fit p-0'>
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
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default MobileToolbar
