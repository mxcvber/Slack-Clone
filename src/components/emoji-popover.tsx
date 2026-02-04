import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react'

interface EmojiPopoverProps {
  children: React.ReactNode
  onEmojiSelect: (emoji: string) => void
  hint?: string
}

const EmojiPopover: React.FC<EmojiPopoverProps> = ({ children, onEmojiSelect, hint = 'Emoji' }) => {
  const onSelect = (value: EmojiClickData) => {
    onEmojiSelect(value.emoji)
  }

  return (
    <TooltipProvider>
      <Popover>
        <Tooltip delayDuration={50}>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
          </PopoverTrigger>

          <TooltipContent className='bg-black text-white border border-white/5'>
            <p className='font-medium text-xs'>{hint}</p>
          </TooltipContent>
        </Tooltip>

        <PopoverContent className='p-0 w-full border-none shadow-none'>
          <EmojiPicker onEmojiClick={onSelect} />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  )
}

export default EmojiPopover
