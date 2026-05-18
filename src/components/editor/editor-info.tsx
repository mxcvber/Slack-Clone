const EditorInfo = ({ variant }: { variant: 'create' | 'update' }) => {
  return (
    variant === 'create' && (
      <div className='p-2 text-muted-foreground flex justify-end'>
        <p className='text-xs sm:text-sm'>
          <strong className='text-xs sm:text-sm'>Shift + Return</strong> to add a new line
        </p>
      </div>
    )
  )
}

export default EditorInfo
