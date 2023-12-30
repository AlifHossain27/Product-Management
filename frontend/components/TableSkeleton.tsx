import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';

const TableSkeleton = () => {
  return (
    <div className='flex flex-col gap-6'>
          <Skeleton className="sm:w-[300] w-[640px] h-[30px] " />
          <Skeleton className="sm:w-[300] w-[640px] h-[30px] " />
          <Skeleton className="sm:w-[300] w-[640px] h-[30px] " />
          <Skeleton className="sm:w-[300] w-[640px] h-[30px] " />
          <Skeleton className="sm:w-[300] w-[640px] h-[30px] " />
          <Skeleton className="sm:w-[300] w-[640px] h-[30px] " />
          <Skeleton className="sm:w-[300] w-[640px] h-[30px] " />
          <Skeleton className="sm:w-[300] w-[640px] h-[30px] " />
          <Skeleton className="sm:w-[300] w-[640px] h-[30px] " />
          <Skeleton className="sm:w-[300] w-[640px] h-[30px] " />
    </div>
  )
}

export default TableSkeleton