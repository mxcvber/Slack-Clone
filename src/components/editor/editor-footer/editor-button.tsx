import React from 'react'
import { cn } from '@/lib/utils'
import { MdSend } from 'react-icons/md'
import { Button } from '@/components/ui/button'

interface EditorButtonProps {
  text: string
  variant: 'create' | 'update'
  disabled: boolean
}

const EditorButton: React.FC<EditorButtonProps> = ({ variant, disabled, text }) => {
  const isEmpty = text.replace(/<(.|\n)*?>/g, '').trim().length === 0

  return variant === 'update' ? (
    <div className='ml-auto flex items-center gap-x-2'>
      <Button variant='outline' size='sm' onClick={() => {}} disabled={disabled}>
        Cancel
      </Button>

      <Button
        className='bg-[#007a5a] hover:bg-[#007a5a]/80 text-white'
        size='sm'
        onClick={() => {}}
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
      onClick={() => {}}
    >
      <MdSend className='size-4' />
    </Button>
  )
}

export default EditorButton
