"use client"
import xlsx, { IJsonSheet, IContent } from "json-as-xlsx"

interface CustomerData {
    id: number;
    customer_name: string;
    email: string;
    phone: number;
    address: string;
}

const data = async(): Promise<CustomerData[]> => {
    const resp = await fetch("http://localhost:8000/api/customer/", {
    credentials: 'include',
  })
  const jsonResp = await resp.json()
  return jsonResp
}

export async function downloadToExcelCustomer(){
    const customerData = await data();

    const content: IContent[] = customerData.map((customer) => ({
        id: customer.id,
        customer_name: customer.customer_name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address
    }));
    let columns: IJsonSheet[] = [
        {
            sheet: "Product",
            columns: [
                {label: "Customer Name", value: "customer_name"},
                {label: "Email", value: "email"},
                {label: "Phone", value: "phone"},
                {label: "Address", value: "address"}
            ],
            content
        }
    ]
    let settings = {
        fileName: "Customers"
    }

    xlsx(columns, settings)
}