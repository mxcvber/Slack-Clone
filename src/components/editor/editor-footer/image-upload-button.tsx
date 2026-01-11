import Hint from '@/components/hint'
import { Button } from '@/components/ui/button'
import { ImageIcon } from 'lucide-react'
import React from 'react'

interface ImageUploadButtonProps {
  imageElementRef: React.RefObject<HTMLInputElement | null>
  disabled: boolean
  variant: 'create' | 'update'
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ imageElementRef, disabled, variant }) => {
  return (
    variant === 'create' && (
      <Hint label='Image'>
        <Button disabled={disabled} size='icon-sm' variant='ghost' onClick={() => imageElementRef.current?.click()}>
          <ImageIcon className='size-4' />
        </Button>
      </Hint>
    )
  )
}

export default ImageUploadButton
