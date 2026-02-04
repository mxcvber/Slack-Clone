import Image from 'next/image'
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { XIcon } from 'lucide-react'

const Thumbnail = ({ url }: { url: string | null | undefined }) => {
  if (!url) return null

  return (
    <Dialog>
      <DialogTrigger className='w-fit h-fit'>
        <div className='relative w-52 h-44 overflow-hidden border rounded-lg cursor-zoom-in'>
          <Image src={url} alt='Message image' fill sizes='208px' className='rounded-lg object-cover size-full' />
        </div>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className='sm:max-w-fit h-screen border-none p-0 shadow-none bg-black/50 backdrop-blur-xs'
      >
        <div className='relative overflow-hidden rounded-lg w-screen h-screen'>
          <DialogTitle className='absolute w-screen flex justify-end pr-10 pt-5 z-50'>
            <DialogClose className='cursor-pointer'>
              <XIcon size={40} color='white' />
            </DialogClose>
          </DialogTitle>

          <Image
            quality={100}
            src={url}
            alt='Message image'
            fill
            sizes='100vw'
            className='rounded-lg object-contain size-full z-40'
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Thumbnail
