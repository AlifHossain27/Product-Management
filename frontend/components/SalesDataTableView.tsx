import React from 'react'
import { cookies } from "next/headers"
import {  Sales,columns } from "./SalesDataColumn"
import { DataTable } from "./SalesDataTable"

async function getData(): Promise<Sales[]> {
  const resp = await fetch("http://localhost:8000/api/sale/", {
    headers: { Cookie: cookies().toString() },
  });
  const data = resp.json()
  return data
}

export default async function SalesDataTableView() {
  const data = await getData()
  return (
    <div className='w-auto col-span-2 overflow-auto relative'>
      <DataTable columns={columns} data={data} />
      </div>
  )
}