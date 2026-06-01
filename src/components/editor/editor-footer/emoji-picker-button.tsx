import EmojiPopover from '@/components/emoji-popover'
import { Button } from '@/components/ui/button'
import { Smile } from 'lucide-react'
import type Quill from 'quill'
import React from 'react'

interface EmojiPickerButtonProps {
  quillRef: React.RefObject<Quill | null>
  disabled: boolean
}

const EmojiPickerButton: React.FC<EmojiPickerButtonProps> = ({ disabled, quillRef }) => {
  const onEmojiSelect = (emoji: string) => {
    const quill = quillRef.current
    if (!quill) return

    const selection = quill.getSelection()

    if (selection) {
      quill.insertText(selection.index, emoji)

      quill.setSelection(selection.index + emoji.length, 0)
    } else {
      const length = quill.getLength()
      quill.insertText(length - 1, emoji)
      quill.setSelection(length + emoji.length - 1, 0)
    }
  }

  return (
    <EmojiPopover onEmojiSelect={onEmojiSelect}>
      <Button disabled={disabled} size='icon-sm' variant='ghost' className='max-sm:w-fit'>
        <Smile className='size-4' />
      </Button>
    </EmojiPopover>
  )
}

export default EmojiPickerButton
