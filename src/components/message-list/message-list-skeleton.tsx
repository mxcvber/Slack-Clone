const MessageListSkeleton = () => (
  <div className='flex flex-col gap-8 px-4 pb-4'>
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className='flex items-start gap-3 animate-pulse'>
        {/* Avatar */}
        <div className='w-9 h-9 rounded-lg bg-gray-300/50 shrink-0' />
        <div className='flex flex-col gap-2 flex-1'>
          {/* Name + timestamp */}
          <div className='flex gap-2 items-center'>
            <div className='h-4 w-24 rounded bg-gray-300/50' />
            <div className='h-3 w-16 rounded bg-gray-200/50' />
          </div>
          {/* Message lines - vary widths to look natural */}
          <div className='h-5 w-full max-w-[500px] rounded bg-gray-300/50' style={{ width: `${60 + (i % 4) * 10}%` }} />
          {i % 3 === 0 && <div className='h-5 w-full max-w-[500px] rounded bg-gray-300/50' />}
        </div>
      </div>
    ))}
  </div>
)

export default MessageListSkeleton
