import React from 'react'
import { cookies } from "next/headers"
import {  Customers,columns } from "./CustomerDataColumn"
import { DataTable } from "./CustomerDataTable"


async function getData(): Promise<Customers[]> {
  const resp = await fetch("http://localhost:8000/api/customer/", {
    headers: { Cookie: cookies().toString() },
  });
  const data = resp.json()
  return data
}


export default async function CustomersDataTableView() {
  const data = await getData()
  return (
    <div className='w-auto col-span-2 overflow-auto relative'>
      <DataTable columns={columns} data={data} />
      </div>
  )
}