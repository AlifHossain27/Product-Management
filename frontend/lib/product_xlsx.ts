"use client"
import xlsx, { IJsonSheet, IContent } from "json-as-xlsx"

interface ProductData {
    id: number;
    product_name: string;
    price: number;
    status: string;
    amount: number;
}

const data = async(): Promise<ProductData[]> => {
    const resp = await fetch("http://localhost:8000/api/product/", {
    credentials: 'include',
  })
  const jsonResp = await resp.json()
  return jsonResp
}

export async function downloadToExcelProduct(){
    const productData = await data();

    const content: IContent[] = productData.map((product) => ({
        id: product.id,
        product_name: product.product_name,
        price: product.price,
        status: product.status,
        amount: product.amount,
    }));
    let columns: IJsonSheet[] = [
        {
            sheet: "Product",
            columns: [
                {label: "Product Name", value: "product_name"},
                {label: "Price", value: "price"},
                {label: "Status", value: "status"},
                {label: "Pending Amount", value: "amount"}
            ],
            content
        }
    ]
    let settings = {
        fileName: "Products"
    }

    xlsx(columns, settings)
}