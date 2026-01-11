'use client'

import Quill, { Delta, Op, type QuillOptions } from 'quill'
import 'quill/dist/quill.snow.css'
import React, { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import EditorFooter from './editor-footer'
import EditorInfo from './editor-info'
import { Input } from '../ui/input'
import UploadImage from './upload-image'
import { EditorValue } from '@/types'
import { cn } from '@/lib/utils'

interface EditorProps {
  onSubmit: ({ image, body }: EditorValue) => void
  onCancel?: () => void
  placeholder?: string
  defaultValue?: Delta | Op[]
  disabled?: boolean
  innerRef?: RefObject<Quill | null>
  variant?: 'create' | 'update'
}

const Editor: React.FC<EditorProps> = ({
  onSubmit,
  innerRef,
  onCancel,
  defaultValue = [],
  disabled = false,
  placeholder = 'Write something...',
  variant = 'create',
}) => {
  const [text, setText] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const submitRef = useRef(onSubmit)
  const placeholderRef = useRef(placeholder)
  const quillRef = useRef<Quill | null>(null)
  const defaultValueRef = useRef(defaultValue)
  const containerRef = useRef<HTMLDivElement>(null)
  const disabledRef = useRef(disabled)
  const imageElementRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    submitRef.current = onSubmit
    placeholderRef.current = placeholder
    defaultValueRef.current = defaultValue
    disabledRef.current = disabled
  })

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const editorContainer = container.appendChild(container.ownerDocument.createElement('div'))

    const options: QuillOptions = {
      theme: 'snow',
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [['bold', 'italic', 'strike'], ['link'], [{ list: 'ordered' }, { list: 'bullet' }]],
        keyboard: {
          bindings: {
            enter: {
              key: 'Enter',
              handler: () => {
                const text = quill.getText()
                const addedImage = imageElementRef.current?.files?.[0] || null

                const isEmpty = !addedImage && text.replace(/<(.|\n)*?>/g, '').trim().length === 0

                if (!isEmpty) return

                const body = JSON.stringify(quill.getContents())
                submitRef.current?.({ body, image: addedImage })
              },
            },
            shift_enter: {
              key: 'Enter',
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, '\n')
              },
            },
          },
        },
      },
    }

    const quill = new Quill(editorContainer, options)

    quillRef.current = quill
    quillRef.current.focus()

    if (innerRef) {
      innerRef.current = quill
    }

    quill.setContents(defaultValueRef.current)
    setText(quill.getText())

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText())
    })

    return () => {
      quill.off(Quill.events.TEXT_CHANGE)
      if (container) {
        container.innerHTML = ''
      }
      if (quillRef) {
        quillRef.current = null
      }
      if (innerRef) {
        innerRef.current = null
      }
    }
  }, [innerRef])

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
          disabled && 'opacity-50'
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

export default Editor
