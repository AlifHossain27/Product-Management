"use client"
import { useState, useEffect } from 'react'
import "chart.js/auto";
import { Bar } from 'react-chartjs-2'

const MonthlySaleStats = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Sales',
            data: [],
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      });

    
    useEffect(() => {
    const fetchData = async () => {
        try {
        const resp = await fetch("http://localhost:8000/api/sale/sale-visualization-month/", {
            credentials: 'include'
        });
        const data = await resp.json();

        setChartData({
            labels: data.labels,
            datasets: [
            {
                label: 'Sales',
                data: data.data,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
            ],
        });
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    fetchData();
    }, []);

  return (
    <div>
      <Bar data={chartData}/>
    </div>
  )
}

export default MonthlySaleStats