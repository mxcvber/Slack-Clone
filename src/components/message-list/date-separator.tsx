import { format, isToday, isYesterday } from 'date-fns'

const DateSeparator = ({ dateKey }: { dateKey: string }) => {
  const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr)

    if (isToday(date)) return 'Today'
    if (isYesterday(date)) return 'Yesterday'
    return format(date, 'EEEE, MMMM d')
  }

  return (
    <div className='text-center my-2 relative'>
      <hr className='absolute top-1/2 left-0 right-0 border-gray-300' />
      <span className='relative inline-block bg-white px-4 py-1 rounded-full text-xs border-gray-300 shadow-sm'>
        {formatDateLabel(dateKey)}
      </span>
    </div>
  )
}

export default DateSeparator
