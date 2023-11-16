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
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'

const formSchema = z.object({
    customerName: z.string(),
    email: z.string().optional(),
    phoneNumber: z.coerce.number(),
    address: z.string().optional()
})

const CustomersDataForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          customerName: '',
          email: '',
          phoneNumber: 880,
          address: ''
        },
      })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

  return (
    <Card className=' pt-5 h-auto w-auto border-2 '>
        <CardHeader>
            <CardTitle className='pt-5 text-3xl'>Customers</CardTitle>
            
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
                    <Input autoComplete='off' placeholder="Customer" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Email :</FormLabel>
                <FormControl>
                    <Input autoComplete='off' placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Phone :</FormLabel>
                <FormControl>
                    <Input autoComplete='off' placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Address :</FormLabel>
                <FormControl>
                    <Input autoComplete='off' placeholder="Address" {...field} />
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

export default CustomersDataForm