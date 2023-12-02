import React from 'react'
import ProductDataForm from '@/components/ProductDataForm';
import ProductDataTable from '@/components/ProductDataTableView';

const ProductsPage= () => {
  return (
    <div className='flex-auto flex-col'>
        
      <div className='flex h-1/6 justify-center items-center w-auto'>
        <h1 className='text-5xl'>Products</h1>
      </div>
      <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-5 h-5/6 w-auto px-1'> 
        <ProductDataForm/>
        <ProductDataTable/>
      </div>

    </div>
  )
}

export default ProductsPage;