import React, { RefObject } from 'react'
import Quill from 'quill'
import EditorButton from './editor-button'
import EmojiPickerButton from './emoji-picker-button'
import FormattingToggleButton from './formatting-toggle-button'
import ImageUploadButton from './image-upload-button'

interface EditorFooterProps {
  text: string
  imageElementRef: React.RefObject<HTMLInputElement | null>
  containerRef: RefObject<HTMLDivElement | null>
  quillRef: React.RefObject<Quill | null>
  disabled: boolean
  variant: 'create' | 'update'
}

const EditorFooter: React.FC<EditorFooterProps> = ({
  text,
  imageElementRef,
  containerRef,
  quillRef,
  disabled,
  variant,
}) => {
  return (
    <div className='flex px-2 pb-2 z-5'>
      <FormattingToggleButton containerRef={containerRef} disabled={disabled} />
      <EmojiPickerButton quillRef={quillRef} disabled={disabled} />
      <ImageUploadButton imageElementRef={imageElementRef} variant={variant} disabled={disabled} />

      <EditorButton text={text} disabled={disabled} variant={variant} />
    </div>
  )
}

export default EditorFooter
