import React from 'react'
import SalesDataForm from '@/components/SalesDataForm';
import SalesDataTable from '@/components/SalesDataTable';
import { TbMoneybag } from "react-icons/tb";


const SalesPage = () => {
  return (
    <div className='flex-auto flex-col'>
      <div className='flex h-1/6 justify-center items-center w-auto'>
        <TbMoneybag size='45'/>
        <h1 className='text-5xl'>Sales</h1>
      </div>
      <div className='grid lg:grid-cols-3 gap-2 h-5/6 w-auto px-2 py-2'>
        <SalesDataForm />
        <SalesDataTable/>
      </div>

    </div>
  )
}

export default SalesPage