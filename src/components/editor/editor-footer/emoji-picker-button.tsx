import EmojiPopover from '@/components/emoji-popover'
import { Button } from '@/components/ui/button'
import { Smile } from 'lucide-react'
import Quill from 'quill'
import React from 'react'

interface EmojiPickerButtonProps {
  quillRef: React.RefObject<Quill | null>
  disabled: boolean
}

const EmojiPickerButton: React.FC<EmojiPickerButtonProps> = ({ disabled, quillRef }) => {
  const onEmojiSelect = (emoji: any) => {
    const quill = quillRef.current

    quill?.insertText(quill.getSelection()?.index || 0, emoji.native)
  }

  return (
    <EmojiPopover onEmojiSelect={onEmojiSelect}>
      <Button disabled={disabled} size='icon-sm' variant='ghost'>
        <Smile className='size-4' />
      </Button>
    </EmojiPopover>
  )
}

export default EmojiPickerButton
