import React from 'react'
import {  Sales,columns } from "./SalesDataColumn"
import { DataTable } from "./SalesDataTable"

async function getData(): Promise<Sales[]> {
  return [
    {
      customerName: "Alif",
      total: 100,
      status: 'Pending',
      pending: 100,
    },
    {
      customerName: "Alif",
      total: 100,
      status: 'Pending',
      pending: 100,
    },
    {
      customerName: "Alif",
      total: 100,
      status: 'Pending',
      pending: 100,
    },
    {
      customerName: "Alif",
      total: 100,
      status: 'Pending',
      pending: 100,
    },
    {
      customerName: "Alif",
      total: 100,
      status: 'Pending',
      pending: 100,
    },
    {
      customerName: "Alif",
      total: 100,
      status: 'Pending',
      pending: 100,
    },
    {
      customerName: "Alif",
      total: 100,
      status: 'Pending',
      pending: 100,
    },
  ]
}

export default async function SalesDataTableView() {
  const data = await getData()
  return (
    <div className='w-auto col-span-2 overflow-auto relative'>
      <DataTable columns={columns} data={data} />
      </div>
  )
}