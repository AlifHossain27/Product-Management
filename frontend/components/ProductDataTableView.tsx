import { Products, columns } from "./ProductDataColumn"
import { DataTable } from "./ProductDataTable"
import React from 'react'


async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [

  ]
}

export default async function ProductDataTableView() {
  const data = await getData()
  return (
    <div className='w-auto col-span-2 overflow-auto relative'>
      <DataTable columns={columns} data={data} />
      </div>
  )
}

