import React, { useState } from 'react'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import UploadImage from './upload-image'
import EditorFooter from './editor-footer'
import EditorInfo from './editor-info'
import Quill from 'quill'
import { DefaultEditorType } from '@/types'

interface EditorContentProps extends DefaultEditorType {
  imageElementRef: React.RefObject<HTMLInputElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>
  quillRef: React.RefObject<Quill | null>
  text: string
  disabled: boolean
  variant: 'create' | 'update'
}

const EditorContent: React.FC<EditorContentProps> = ({
  imageElementRef,
  containerRef,
  quillRef,
  onCancel,
  onSubmit,
  text,
  variant,
  disabled,
}) => {
  const [image, setImage] = useState<File | null>(null)

  return (
    <div className='flex flex-col'>
      <Input
        type='file'
        accept='image/*'
        ref={imageElementRef}
        onChange={(event) => setImage(event.target.files![0])}
        className='hidden'
      />

      <div
        className={cn(
          'flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white',
          disabled && 'opacity-50',
        )}
      >
        <div ref={containerRef} className='ql-custom' />
        <UploadImage image={image} setImage={setImage} imageElementRef={imageElementRef} />
        <EditorFooter
          image={image}
          quillRef={quillRef}
          text={text}
          containerRef={containerRef}
          imageElementRef={imageElementRef}
          disabled={disabled}
          variant={variant}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </div>

      <EditorInfo variant={variant} />
    </div>
  )
}

export default EditorContent
