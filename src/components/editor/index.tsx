'use client'

import Quill, { Delta, Op, type QuillOptions } from 'quill'
import 'quill/dist/quill.snow.css'
import React, { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import EditorContent from './editor-content'
import { DefaultEditorType } from '@/types'

interface EditorProps extends DefaultEditorType {
  placeholder?: string
  defaultValue?: Delta | Op[]
  innerRef?: RefObject<Quill | null>
  disabled?: boolean
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

  const submitRef = useRef(onSubmit)
  const placeholderRef = useRef(placeholder)
  const quillRef = useRef<Quill | null>(null)
  const defaultValueRef = useRef(defaultValue)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageElementRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    submitRef.current = onSubmit
    placeholderRef.current = placeholder
    defaultValueRef.current = defaultValue
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

                if (isEmpty) return

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
    <EditorContent
      imageElementRef={imageElementRef}
      containerRef={containerRef}
      quillRef={quillRef}
      onCancel={onCancel}
      onSubmit={onSubmit}
      text={text}
      variant={variant}
      disabled={disabled}
    />
  )
}

export default Editor
