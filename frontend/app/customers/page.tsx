import React from 'react'
import CustomersDataForm from '@/components/CustomersDataForm'
import CustomersDataTableView from '@/components/CustomersDataTableView'

const CustomersPage = () => {
  return (
    <div className='flex-auto flex-col'>
      <div className='flex h-1/6 justify-center items-center w-auto'>
        <h1 className='text-5xl'>Customers</h1>
      </div>
      <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-1 h-5/6 w-auto px-1 py-1'>
        <CustomersDataForm/>
        <CustomersDataTableView/>
      </div>

    </div>
  )
}

export default CustomersPage