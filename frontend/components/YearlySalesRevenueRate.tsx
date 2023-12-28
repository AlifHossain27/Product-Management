"use client"
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card"


interface SalesData {
    current_year_sales: number;
    previous_year_sales: number;
    increase_percentage: number;
}

const YearlySalesRevenueRate = () => {
    const [salesData, setSalesData] = useState<SalesData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const resp = await fetch('http://localhost:8000/api/sale/yearly-sales-revenue-rate/', {
            credentials: 'include',
            });
            const data: SalesData = await resp.json();
            setSalesData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);

  return (
    <Card className='rounded-xl border bg-card text-card-foreground shadow'>
        <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
        <h3 className='text-lg font-medium'>Yearly Revenue</h3> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="h-4 w-4 text-muted-foreground"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </div>
          {salesData !== null ? (
            <div className='p-6 pt-0'>
              {salesData.increase_percentage > 0 ? (
                <div>
                  <p className='text-2xl font-bold'>
                    + {salesData.current_year_sales - salesData.previous_year_sales}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    + {salesData.increase_percentage}% from last year
                  </p>
                </div>
              ) : salesData.increase_percentage < 0 ? (
                <div>
                  <p className='text-2xl font-bold'>
                    - {salesData.previous_year_sales - salesData.current_year_sales}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    - {Math.abs(salesData.increase_percentage)}% from last year
                  </p>
                </div>
              ) : (
                <p>No change</p>
              )}
            </div>
          ) : (
            'Loading...'
          )}
    </Card>
  );
}

export default YearlySalesRevenueRate