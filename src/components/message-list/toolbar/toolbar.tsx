import React from 'react'
import DefaultToolbar from './default-toolbar'
import MobileToolbar from './mobile-toolbar'
import { ToolbarProps } from '@/types'

const Toolbar: React.FC<ToolbarProps> = ({
  handleDelete,
  handleEdit,
  handleThread,
  handleReaction,
  hideThreadButton,
  isAuthor,
  isPending,
}) => {
  return (
    <div className='absolute -top-1.5 right-5'>
      <DefaultToolbar
        isAuthor={isAuthor}
        isPending={isPending}
        handleEdit={handleEdit}
        handleThread={handleThread}
        handleDelete={handleDelete}
        handleReaction={handleReaction}
        hideThreadButton={hideThreadButton}
      />

      <MobileToolbar
        isAuthor={isAuthor}
        isPending={isPending}
        handleEdit={handleEdit}
        handleThread={handleThread}
        handleDelete={handleDelete}
        handleReaction={handleReaction}
        hideThreadButton={hideThreadButton}
      />
    </div>
  )
}

export default Toolbar
