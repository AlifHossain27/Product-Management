import React from 'react'

const DashboardPage = () => {
  return (
    <div className='flex-auto flex-col'>
      <div className='flex h-2/6 justify-center items-center w-auto bg-fuchsia-900'>
        
      </div>
      <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-5 h-5/6 w-auto px-1'>
        <div className='w-auto col-span-2 overflow-auto relative bg-green-800'>

        </div>
        <div className='w-auto overflow-auto relative bg-gray-800'>

        </div>
      </div>
    </div>
  )
}

export default DashboardPage;