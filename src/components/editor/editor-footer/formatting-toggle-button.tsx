import Hint from '@/components/hint'
import { Button } from '@/components/ui/button'
import React, { RefObject, useState } from 'react'
import { PiTextAa } from 'react-icons/pi'

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
      <Button disabled={disabled} size='icon-sm' variant='ghost' onClick={toggleToolbar}>
        <PiTextAa className='size-4' />
      </Button>
    </Hint>
  )
}

export default FormattingToggleButton
