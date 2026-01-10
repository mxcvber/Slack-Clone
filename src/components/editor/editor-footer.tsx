import React, { RefObject, useState } from 'react'
import Hint from '../hint'
import { Button } from '../ui/button'
import { PiTextAa } from 'react-icons/pi'
import { ImageIcon, Smile } from 'lucide-react'
import EditorButton from './editor-button'
import EmojiPopover from '../emoji-popover'
import Quill from 'quill'

interface EditorFooterProps {
  text: string
  containerRef: RefObject<HTMLDivElement | null>
  quillRef: React.RefObject<Quill | null>
  disabled: boolean
  variant: 'create' | 'update'
}

const EditorFooter: React.FC<EditorFooterProps> = ({ text, containerRef, quillRef, disabled, variant }) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(true)

  const toggleToolbar = () => {
    setIsToolbarVisible((current) => !current)

    const toolbarElement = containerRef.current?.querySelector('.ql-toolbar')

    if (toolbarElement) {
      toolbarElement.classList.toggle('hidden')
    }
  }

  const onEmojiSelect = (emoji: any) => {
    const quill = quillRef.current

    quill?.insertText(quill.getSelection()?.index || 0, emoji.native)
  }

  return (
    <div className='flex px-2 pb-2 z-5'>
      <Hint label={isToolbarVisible ? 'Hide formatting' : 'Show formatting'}>
        <Button disabled={disabled} size='icon-sm' variant='ghost' onClick={toggleToolbar}>
          <PiTextAa className='size-4' />
        </Button>
      </Hint>

      <EmojiPopover onEmojiSelect={onEmojiSelect}>
        <Button disabled={disabled} size='icon-sm' variant='ghost'>
          <Smile className='size-4' />
        </Button>
      </EmojiPopover>

      {variant === 'create' && (
        <Hint label='Image'>
          <Button disabled={disabled} size='icon-sm' variant='ghost' onClick={() => {}}>
            <ImageIcon className='size-4' />
          </Button>
        </Hint>
      )}

      <EditorButton text={text} disabled={disabled} variant={variant} />
    </div>
  )
}

export default EditorFooter
