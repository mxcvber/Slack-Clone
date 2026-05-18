import Image from 'next/image'
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { XIcon } from 'lucide-react'

const Thumbnail = ({ url }: { url: string | null | undefined }) => {
  if (!url) return null

  return (
    <Dialog>
      <DialogTrigger className='relative aspect-square w-full max-w-30 cursor-zoom-in border rounded-lg'>
        <Image src={url} alt='Message image' fill sizes='100vw' className='rounded-lg object-cover' />
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className='max-w-screen max-h-screen p-0 w-screen h-screen sm:max-w-screen bg-black/70 backdrop-blur-xs border-none rounded-none flex items-center justify-center'
      >
        <DialogTitle />
        <DialogClose className='cursor-pointer absolute top-5 right-5 z-50'>
          <XIcon size={34} color='white' />
        </DialogClose>

        <div className='relative w-[calc(100vw-2rem)] h-[calc(100vh-8rem)]'>
          <Image quality={100} src={url} alt='Message image' fill sizes='100vw' className='object-contain' />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Thumbnail
