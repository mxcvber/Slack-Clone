import React from 'react'
import { Button } from '../ui/button'
import { XIcon } from 'lucide-react'
import Image from 'next/image'

interface UploadImageProps {
  imageElementRef: React.RefObject<HTMLInputElement | null>
  image: File | null
  setImage: React.Dispatch<React.SetStateAction<File | null>>
}

const UploadImage: React.FC<UploadImageProps> = ({ image, setImage, imageElementRef }) => {
  return (
    image && (
      <div className='p-2'>
        <div className='relative size-[62px] flex items-center justify-center group'>
          <Button
            onClick={() => {
              setImage(null)
              imageElementRef.current!.value = ''
            }}
            className='hidden p-3 group-hover:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-4 border-2 border-white justify-center items-center'
          >
            <XIcon className='size-3.5' />
          </Button>

          <Image
            src={URL.createObjectURL(image)}
            alt='Uploaded'
            fill
            className='rounded-xl overflow-hidden border object-cover'
          />
        </div>
      </div>
    )
  )
}

export default UploadImage
