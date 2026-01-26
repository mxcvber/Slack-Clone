import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface ConversationHeroProps {
  name?: string
  image?: string
}

const ConversationHero: React.FC<ConversationHeroProps> = ({ name = 'Member', image }) => {
  const avatatFallback = name.charAt(0).toUpperCase()

  return (
    <div className='mt-[88px] mx-5 mb-8'>
      <div className='flex items-center gap-x-1 mb-2'>
        <Avatar className='size-14 mr-2'>
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{avatatFallback}</AvatarFallback>
        </Avatar>
        <p className='text-2xl font-bold'>{name}</p>
      </div>
      <p className='font-normal text-slate-800 break-all'>
        This conversation is just between you and <strong>{name}</strong>. Say hello!
      </p>
    </div>
  )
}

export default ConversationHero
