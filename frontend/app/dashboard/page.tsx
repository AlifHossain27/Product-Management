import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import YearlySaleStats from '@/components/YearlySaleStats'
import MonthlySaleStats from '@/components/MonthlySaleStats'

const DashboardPage = () => {
  return (
    <div className='flex-auto flex-col'>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 justify-center items-center gap-5 w-auto px-5 py-24'>
        <Card>
          <CardHeader>
            <CardTitle>Total Sales This Month</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Amount This Month</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Sales This Year</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Amount This Year</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className='grid lg:grid-cols-5 sm:grid-cols-2 gap-5 h-auto w-auto px-5 py-5'>
        <div className='w-auto h-auto col-span-3 overflow-auto relative border rounded-md'>
          <Tabs defaultValue="monthly" className="w-auto">
            <TabsList className='w-full'>
              <TabsTrigger value="monthly" className='w-full'>Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className='w-full'>Yearly</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly">
              <MonthlySaleStats/>
            </TabsContent>
            <TabsContent value="yearly">
              <YearlySaleStats/>
            </TabsContent>
          </Tabs>
        </div>
        <div className='w-auto col-span-2 overflow-auto relative bg-gray-800'>
          <h1>List</h1>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;