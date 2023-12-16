import React from 'react'
import SalesDataForm from '@/components/SalesDataForm';
import SalesDataTableView from '@/components/SalesDataTableView';
import { TbMoneybag } from "react-icons/tb";


const SalesPage = () => {
  return (
    <div className='flex-auto flex-col'>
      <div className='flex h-1/6 justify-center items-center w-auto'>
        <TbMoneybag size='45'/>
        <h1 className='text-5xl'>Sales</h1>
      </div>
      <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-5 h-5/6 w-auto px-1 py-1'>
      <div className='flex justify-center items-center'>
        <SalesDataForm />
      </div>
        <SalesDataTableView/>
      </div>

    </div>
  )
}

export default SalesPage