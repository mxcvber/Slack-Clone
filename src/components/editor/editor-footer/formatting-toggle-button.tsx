import Hint from '@/components/hint'
import { Button } from '@/components/ui/button'
import { CaseSensitiveIcon } from 'lucide-react'
import React, { RefObject, useState } from 'react'

interface FormattingToggleButtonProps {
  containerRef: RefObject<HTMLDivElement | null>
  disabled: boolean
}

const FormattingToggleButton: React.FC<FormattingToggleButtonProps> = ({ containerRef, disabled }) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(true)

  const toggleToolbar = () => {
    setIsToolbarVisible((current) => !current)

    const toolbarElement = containerRef.current?.querySelector('.ql-toolbar')

    if (toolbarElement) {
      toolbarElement.classList.toggle('hidden')
    }
  }

  return (
    <Hint label={isToolbarVisible ? 'Hide formatting' : 'Show formatting'}>
      <Button disabled={disabled} size='icon-sm' variant='ghost' onClick={toggleToolbar} className='max-sm:w-fit'>
        <CaseSensitiveIcon strokeWidth={1.5} className='size-4.5' />
      </Button>
    </Hint>
  )
}

export default FormattingToggleButton
