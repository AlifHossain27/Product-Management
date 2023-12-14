import { cookies } from "next/headers"
import { Products, columns } from "./ProductDataColumn"
import { DataTable } from "./ProductDataTable"
import React from 'react'


async function getData(): Promise<Products[]> {
  const resp = await fetch("http://localhost:8000/api/product/", {
    headers: { Cookie: cookies().toString() },
  });
  const data = resp.json()
  
  return data
}

export default async function ProductDataTableView() {
  const data = await getData()
  return (
    <div className='w-auto col-span-2 overflow-auto relative'>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

