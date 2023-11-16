import React from 'react'
import CustomersDataForm from '@/components/CustomersDataForm'
import CustomersDataTable from '@/components/CustomersDataTable'
import { BsPeopleFill } from "react-icons/bs"

const CustomersPage = () => {
  return (
    <div className='flex-auto flex-col'>
      <div className='flex h-1/6 justify-center items-center w-auto'>
        <BsPeopleFill size='45'/>
        <h1 className='text-5xl'>Customers</h1>
      </div>
      <div className='grid lg:grid-cols-3 gap-2 h-5/6 w-auto px-2 py-2'>
        <CustomersDataForm/>
        <CustomersDataTable/>
      </div>

    </div>
  )
}

export default CustomersPage