import React, { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

interface EmojiPopoverProps {
  children: React.ReactNode
  onEmojiSelect: (emoji: any) => void
  hint?: string
}

const EmojiPopover: React.FC<EmojiPopoverProps> = ({ children, onEmojiSelect, hint = 'Emoji' }) => {
  const [popoverOpen, setPopoverOpen] = useState(false)

  const onSelect = (emoji: any) => {
    onEmojiSelect(emoji)
    setPopoverOpen(false)
  }

  return (
    <TooltipProvider>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Tooltip delayDuration={50}>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
          </PopoverTrigger>

          <TooltipContent className='bg-black text-white border border-white/5'>
            <p className='font-medium text-xs'>{hint}</p>
          </TooltipContent>
        </Tooltip>

        <PopoverContent className='p-0 w-full border-none shadow-none'>
          <Picker data={data} onEmojiSelect={onSelect} />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  )
}

export default EmojiPopover
