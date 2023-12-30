import React, { Suspense } from 'react'
import ProductDataForm from '@/components/ProductDataForm';
import ProductDataTable from '@/components/ProductDataTableView';
import CardSkeleton from '@/components/CardSkeleton';
import TableSkeleton from '@/components/TableSkeleton';

const ProductsPage= () => {
  return (
    <div className='flex-auto flex-col'>
        
      <div className='flex h-1/6 justify-center items-center w-auto'>
        <h1 className='text-5xl'>Products</h1>
      </div>
      <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-5 h-5/6 w-auto px-1'> 
      <div className='flex justify-center items-center'>
        <Suspense fallback = {
          <CardSkeleton/>
        }>
          <ProductDataForm/>
        </Suspense>
      </div>
        <Suspense fallback = {
          <TableSkeleton/>
        }>
          <ProductDataTable/>
        </Suspense>
      </div>

    </div>
  )
}

export default ProductsPage;