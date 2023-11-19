import { Products, columns } from "./ProductDataColumn"
import { DataTable } from "./ProductDataTable"
import React from 'react'

// Mock data
async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      productName: 'Apple',
      price: 170,
      status:  "In Stock",
      amount: 70
    },
    {
      productName: 'Mango',
      price: 150,
      status:  "In Stock",
      amount: 80
    },
    {
      productName: 'Grape',
      price: 70,
      status:  "In Stock",
      amount: 170
    },
    {
      productName: 'Tomato',
      price: 150,
      status:  "In Stock",
      amount: 20
    },
    {
      productName: 'Potato',
      price: 120,
      status:  "In Stock",
      amount: 30
    },
    {
      productName: 'Apple',
      price: 170,
      status:  "In Stock",
      amount: 70
    },
    {
      productName: 'Mango',
      price: 150,
      status:  "In Stock",
      amount: 80
    },
    {
      productName: 'Grape',
      price: 70,
      status:  "In Stock",
      amount: 170
    },
    {
      productName: 'Tomato',
      price: 150,
      status:  "In Stock",
      amount: 20
    },
    {
      productName: 'Potato',
      price: 120,
      status:  "In Stock",
      amount: 30
    },
    
  ]
}

export default async function ProductDataTableView() {
  const data = await getData()
  return (
    <div className='col-span-2'>
      <DataTable columns={columns} data={data} />
      </div>
  )
}

