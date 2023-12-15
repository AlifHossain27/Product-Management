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
    customer_name: z.string(),
    totalAmount: z.coerce.number(),
    pending: z.enum(['pending','settled']),
    pendingAmount: z.coerce.number().optional(),
})



const SalesDataForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          customer_name: '',
          totalAmount: 0,
          pending: 'settled',
          pendingAmount: 0
        },
      })
    
    const status = form.watch('pending')
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

  return (
    <Card className=' pt-5 h-max w-auto border-2 '>
        <CardHeader>
            <CardTitle className='pt-5 text-3xl'>Sales</CardTitle>
            
        </CardHeader>
        <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
            control={form.control}
            name="customer_name"
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
                <Select onValueChange={field.onChange}>
                <FormControl>
                <SelectTrigger className="w-full rounded-none">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                </FormControl>
                <SelectContent className='rounded-none'>
                    <SelectItem className='rounded-none' value='pending'>Pending</SelectItem>
                    <SelectItem className='rounded-none' value="settled">Settled</SelectItem>
                </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            {status === 'pending' &&
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
            }
            
            <div className='pb-10'>
                <Button type="submit" className='h-12 w-full rounded-[9999px]'>Submit</Button>
            </div>
        </form>
        </Form>
        </CardContent>
        </Card>
  )
}

export default SalesDataForm