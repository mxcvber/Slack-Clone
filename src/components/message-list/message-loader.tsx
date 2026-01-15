import { Loader } from 'lucide-react'
import React from 'react'

interface MessageLoaderProps {
  loadMore: (() => void) | undefined
  canLoadMore: boolean
  isLoadingMore: boolean
}

const MessageLoader: React.FC<MessageLoaderProps> = ({ loadMore, canLoadMore, isLoadingMore }) => {
  return (
    <div>
      <div
        className='h-1'
        ref={(el) => {
          if (el) {
            const observer = new IntersectionObserver(
              ([entry]) => {
                if (entry.isIntersecting && canLoadMore && loadMore) {
                  loadMore()
                }
              },
              { threshold: 1.0 }
            )

            observer.observe(el)
            return () => observer.disconnect()
          }
        }}
      />
      {isLoadingMore && (
        <div className='text-center my-2 relative'>
          <hr className='absolute top-1/2 left-0 right-0 border-gray-300' />
          <span className='relative inline-block bg-white px-4 py-1 rounded-full text-xs border-gray-300 shadow-sm'>
            <Loader />
          </span>
        </div>
      )}
    </div>
  )
}

export default MessageLoader
