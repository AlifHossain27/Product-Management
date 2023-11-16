'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'

const formSchema = z.object({
    customerName: z.string(),
    totalAmount: z.coerce.number(),
    pending: z.boolean(),
    pendingAmount: z.coerce.number().optional(),
})



const SalesDataForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          customerName: '',
          totalAmount: 0,
          pending: false,
          pendingAmount: 0
        },
      })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

  return (
    <Card className=' pt-5 h-auto w-auto border-2 '>
        <CardHeader>
            <CardTitle className='pt-5 text-3xl'>Products</CardTitle>
            
        </CardHeader>
        <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Customer:</FormLabel>
                <FormControl>
                    <Input autoComplete='off' placeholder="Customer Name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="totalAmount"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Amount :</FormLabel>
                <FormControl>
                    <Input type="number" autoComplete='off' placeholder="Total Amount" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="pending"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Status :</FormLabel>
                <FormControl>
                <Select>
                <SelectTrigger className="w-full rounded-none">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className='rounded-none'>
                    <SelectItem className='rounded-none' value='true'>Pending</SelectItem>
                    <SelectItem className='rounded-none' value="false">Settled</SelectItem>
                </SelectContent>
                </Select>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="pendingAmount"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Pending :</FormLabel>
                <FormControl>
                    <Input type='number' autoComplete='off' placeholder="Pending Amount" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            
            <Button type="submit" className='h-12 w-full'>Submit</Button>
        </form>
        </Form>
        </CardContent>
        </Card>
  )
}

export default SalesDataForm