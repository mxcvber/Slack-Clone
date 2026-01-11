import React from 'react'
import { cn } from '@/lib/utils'
import { MdSend } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import { EditorValue } from '@/types'
import Quill from 'quill'

interface EditorButtonProps {
  quillRef: React.RefObject<Quill | null>
  text: string
  variant: 'create' | 'update'
  disabled: boolean
  onCancel: (() => void) | undefined
  onSubmit: ({ image, body }: EditorValue) => void
  image: File | null
}

const EditorButton: React.FC<EditorButtonProps> = ({
  variant,
  disabled,
  text,
  onCancel,
  onSubmit,
  quillRef,
  image,
}) => {
  const isEmpty = !image && text.replace(/<(.|\n)*?>/g, '').trim().length === 0

  const handleSubmit = () => {
    onSubmit({
      body: JSON.stringify(quillRef.current?.getContents()),
      image,
    })
  }

  return variant === 'update' ? (
    <div className='ml-auto flex items-center gap-x-2'>
      <Button variant='outline' size='sm' onClick={onCancel} disabled={disabled}>
        Cancel
      </Button>

      <Button
        className='bg-[#007a5a] hover:bg-[#007a5a]/80 text-white'
        size='sm'
        onClick={handleSubmit}
        disabled={disabled || isEmpty}
      >
        Save
      </Button>
    </div>
  ) : (
    <Button
      disabled={disabled || isEmpty}
      size='icon-sm'
      className={cn(
        'ml-auto',
        isEmpty ? 'bg-white hover:bg-white text-muted-foreground' : 'bg-[#007a5a] hover:bg-[#007a5a]/80 text-white'
      )}
      onClick={handleSubmit}
    >
      <MdSend className='size-4' />
    </Button>
  )
}

export default EditorButton
