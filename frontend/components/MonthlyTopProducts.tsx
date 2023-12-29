"use client"
import React, { useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"

interface Product {
    product_name: string;
    total_quantity: number;
}
  
interface SalesData {
    total_quantity_sold: number;
    top_products: Product[];
}
  

const MonthlyTopProducts = () => {
    const [salesData, setSalesData] = useState<SalesData | null>(null);

    useEffect(() => {
      const fetchData = async () => {
          const resp = await fetch('http://localhost:8000/api/sale/monthly-top-products/');
          const data = await resp.json();
          setSalesData(data);
      };
      fetchData();
    }, []);
  
    if (!salesData) {
      return null; // Render nothing while data is being fetched
    }
  
    return (
      <div>
        <h3 className="text-lg font-semibold leading-none pt-5">Recent Sales</h3>
        <p className="text-sm text-muted-foreground">You sold {salesData.total_quantity_sold} products this month.</p>
        <div className='pt-10 text-xl h-auto'>
        <ScrollArea className="h-[300px]">
            <table className='w-full'>
              <tbody>
                  {salesData.top_products.map((product, index) => (
                  <tr key={index}>
                      <td className='py-8 pr-4'>{product.product_name}</td>
                      <td className='py-8 text-right pr-10'>{product.total_quantity}</td>
                  </tr>
                  ))}
              </tbody>
            </table>
        </ScrollArea>
        </div>
      </div>
    );
  };

export default MonthlyTopProducts