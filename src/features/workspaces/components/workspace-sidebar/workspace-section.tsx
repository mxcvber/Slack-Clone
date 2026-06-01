'use client'

import Hint from '@/components/hint'
import { Button } from '@/components/ui/button'
import { useCreateChannelModal } from '@/features/channels/store/use-create-channel-modal'
import { cn } from '@/lib/utils'
import { ChevronDownIcon, PlusIcon } from 'lucide-react'
import React from 'react'
import { useToggle } from 'react-use'

interface WorkspaceSectionProps {
  children: React.ReactNode
  label: string
  hint: string
  isAdmin?: boolean
}

const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({ children, hint, label, isAdmin }) => {
  const [on, toggle] = useToggle(true)
  const { setOpen } = useCreateChannelModal()

  const onNew = isAdmin ? () => setOpen(true) : undefined

  return (
    <div className='flex flex-col mt-3 px-0 sm:px-2'>
      <div className='flex items-center sm:px-3.5 group'>
        <Button onClick={toggle} variant='transparent' className='p-0.5 text-sm text-light-gray shrink-0 size-6'>
          <ChevronDownIcon
            strokeWidth={4}
            className={cn('size-4.5 sm:size-5 transition-transform -rotate-90', on && 'rotate-0')}
          />
        </Button>

        <Button
          variant='transparent'
          size='sm'
          className='shrink group px-1.5 text-xs sm:text-sm text-light-gray h-7 overflow-hidden'
        >
          <span className='truncate'>{label}</span>
        </Button>

        {onNew && (
          <Hint label={hint} side='top' align='center'>
            <Button
              onClick={onNew}
              variant='transparent'
              size='icon-sm'
              className='opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-light-gray size-6 shrink-0'
            >
              <PlusIcon className='size-5' />
            </Button>
          </Hint>
        )}
      </div>

      {on && children}
    </div>
  )
}

export default WorkspaceSection
