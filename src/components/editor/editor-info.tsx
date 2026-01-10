const EditorInfo = ({ variant }: { variant: 'create' | 'update' }) => {
  return (
    variant === 'create' && (
      <div className='p-2 text-[10px] text-muted-foreground flex justify-end opacity-0 transition'>
        <p>
          <strong>Shift + Return</strong> to add a new line
        </p>
      </div>
    )
  )
}

export default EditorInfo
