import { format } from 'date-fns'
import React from 'react'

interface ChannelHeroProps {
  name: string
  creatinTime: number
}

const ChannelHero: React.FC<ChannelHeroProps> = ({ creatinTime, name }) => {
  return (
    <div className='mt-[88px] mx-5 mb-8'>
      <p className='text-2xl font-bold mb-2 break-all'># {name}</p>
      <p className='font-normal text-slate-800 break-all'>
        This channel was created on {format(creatinTime, 'MMMM do, yyyy')}. This is the very beginning of the{' '}
        <strong>{name}</strong> channel.
      </p>
    </div>
  )
}

export default ChannelHero
