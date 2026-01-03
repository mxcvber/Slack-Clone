import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import VerificationInput from 'react-verification-input'
import JoinInfo from './join-info'

interface JoinScreenProps {
  handleComplete: (value: string) => void
  loading: boolean
  workspaceName: string
}

const JoinScreen: React.FC<JoinScreenProps> = ({ handleComplete, loading, workspaceName }) => {
  return (
    <div className='h-full flex flex-col gap-y-8 items-center justify-center bg-white'>
      <Image src='/logo.png' quality={95} width={80} height={80} alt='Logo' />

      <div className='flex flex-col gap-y-4 items-center justify-center max-w-md'>
        <JoinInfo workspaceName={workspaceName} />

        <VerificationInput
          onComplete={handleComplete}
          length={6}
          classNames={{
            container: cn('flex gap-x-2', loading && 'opacity-50 cursor-not-allowed'),
            character:
              'uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500',
            characterInactive: 'bg-muted',
            characterSelected: 'bg-white text-black',
            characterFilled: 'bg-white text-black',
          }}
          autoFocus
        />
      </div>

      <div>
        <Button size='lg' variant='outline' asChild>
          <Link href='/'>Back to home</Link>
        </Button>
      </div>
    </div>
  )
}

export default JoinScreen
