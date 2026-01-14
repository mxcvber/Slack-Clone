import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'

const Thumbnail = ({ url }: { url: string | null | undefined }) => {
  if (!url) return null

  return (
    <Dialog>
      <DialogTrigger className='w-fit h-fit'>
        <div className='relative w-40 h-44 overflow-hidden border rounded-lg cursor-zoom-in'>
          <Image src={url} alt='Message image' fill className='rounded-lg object-cover size-full' />
        </div>
      </DialogTrigger>

      <DialogContent className='w-fit border-none bg-transparent p-0 shadow-none'>
        <DialogTitle />
        <div className='overflow-hidden rounded-lg'>
          <Image
            quality={100}
            src={url}
            alt='Message image'
            width={500}
            height={500}
            className='rounded-lg object-cover size-full'
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Thumbnail
