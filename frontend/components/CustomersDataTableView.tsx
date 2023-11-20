import React from 'react'
import {  Customers,columns } from "./CustomerDataColumn"
import { DataTable } from "./CustomerDataTable"


async function getData(): Promise<Customers[]> {
  return [
    {
      customerName: "Alif",
      email: "alif@",
      phone: 8801753405699,
      address: "home sweet home",
    },
    {
      customerName: "Alif",
      email: "",
      phone: 8801753405699,
      address: "home sweet home",
    },
    {
      customerName: "Alif",
      email: "alif@",
      phone: 8801753405699,
      address: "home sweet home",
    },
    {
      customerName: "Alif",
      email: "alif@",
      phone: 8801753405699,
      address: "home sweet home",
    },
    {
      customerName: "Alif",
      email: "alif@",
      phone: 8801753405699,
      address: "home sweet home",
    },
    {
      customerName: "Alif",
      email: "alif@",
      phone: 8801753405699,
      address: "home sweet home",
    },
    {
      customerName: "Alif",
      email: "alif@",
      phone: 8801753405699,
      address: "home sweet home",
    },
    {
      customerName: "Alif",
      email: "alif@",
      phone: 8801753405699,
      address: "home sweet home",
    },
    {
      customerName: "Alif",
      email: "alif@",
      phone: 8801753405699,
      address: "home sweet home",
    },
    {
      customerName: "Alif",
      email: "alif@",
      phone: 8801753405699,
      address: "home sweet home",
    },
    {
      customerName: "Alif",
      email: "alif@",
      phone: 8801753405699,
      address: "home sweet home",
    },
    {
      customerName: "Alif",
      email: "alif@",
      phone: 8801753405699,
      address: "home sweet home",
    },
    {
      customerName: "Alif",
      email: "alif@",
      phone: 8801753405699,
      address: "home sweet home",
    },
    {
      customerName: "Alif",
      email: "alif@",
      phone: 8801753405699,
      address: "home sweet home",
    },

  ]
}


export default async function CustomersDataTableView() {
  const data = await getData()
  return (
    <div className='w-auto col-span-2 overflow-auto relative'>
      <DataTable columns={columns} data={data} />
      </div>
  )
}