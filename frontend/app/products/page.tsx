import React from 'react'
import ProductDataForm from '@/components/ProductDataForm';
import ProductDataTable from '@/components/ProductDataTable';
import { FaList } from "react-icons/fa"

const ProductsPage= () => {
  return (
    <div className='flex-auto flex-col'>
        
      <div className='flex h-1/6 justify-center items-center w-auto'>
        <FaList size='45'/>
        <h1 className='text-5xl'>Products</h1>
      </div>
      <div className='grid lg:grid-cols-3 gap-2 h-5/6 w-auto px-2 py-2'>
        <ProductDataForm/>
        <ProductDataTable/>
      </div>

    </div>
  )
}

export default ProductsPage;