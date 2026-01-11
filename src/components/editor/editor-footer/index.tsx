import React, { RefObject } from 'react'
import Quill from 'quill'
import EditorButton from './editor-button'
import EmojiPickerButton from './emoji-picker-button'
import FormattingToggleButton from './formatting-toggle-button'
import ImageUploadButton from './image-upload-button'
import { EditorValue } from '@/types'

interface EditorFooterProps {
  text: string
  imageElementRef: React.RefObject<HTMLInputElement | null>
  containerRef: RefObject<HTMLDivElement | null>
  quillRef: React.RefObject<Quill | null>
  disabled: boolean
  variant: 'create' | 'update'
  onCancel: (() => void) | undefined
  onSubmit: ({ image, body }: EditorValue) => void
  image: File | null
}

const EditorFooter: React.FC<EditorFooterProps> = ({
  text,
  imageElementRef,
  containerRef,
  quillRef,
  disabled,
  variant,
  onCancel,
  onSubmit,
  image,
}) => {
  return (
    <div className='flex px-2 pb-2 z-5'>
      <FormattingToggleButton containerRef={containerRef} disabled={disabled} />
      <EmojiPickerButton quillRef={quillRef} disabled={disabled} />
      <ImageUploadButton imageElementRef={imageElementRef} variant={variant} disabled={disabled} />

      <EditorButton
        image={image}
        quillRef={quillRef}
        onSubmit={onSubmit}
        onCancel={onCancel}
        text={text}
        disabled={disabled}
        variant={variant}
      />
    </div>
  )
}

export default EditorFooter
