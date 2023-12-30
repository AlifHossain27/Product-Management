import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';

const CardSkeleton = () => {
  return (
    <div className='flex flex-col gap-6'>
            <Skeleton className="sm:w-[300px] w-[400px] h-[30px] " />
            <Skeleton className="sm:w-[300px] w-[400px] h-[30px] " />
            <Skeleton className="sm:w-[300px] w-[400px] h-[30px] " />
            <Skeleton className="sm:w-[300px] w-[400px] h-[30px] " />
            <Skeleton className="sm:w-[300px] w-[400px] h-[30px] " />
    </div>
  )
}

export default CardSkeleton