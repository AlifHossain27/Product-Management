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
    productName: z.string(),
    price: z.coerce.number(),
    inStock: z.boolean(),
    amount: z.coerce.number().optional(),
})

const ProductDataForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          productName: "",
          price: 0,
          inStock: false,
          amount: 0,
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
            name="productName"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Product :</FormLabel>
                <FormControl>
                    <Input autoComplete='off' placeholder="Product Name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Price :</FormLabel>
                <FormControl>
                    <Input type='number' placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
                
            )}
            />
            <FormField
            control={form.control}
            name="inStock"
            render={({ field }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Status :</FormLabel>
                <FormControl>
                <Select>
                <SelectTrigger className="w-full rounded-none">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className='rounded-none'>
                    <SelectItem className='rounded-none' value='true'>In Stock</SelectItem>
                    <SelectItem className='rounded-none'value='false'>Stock Out</SelectItem>
                </SelectContent>
                </Select>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="amount"
            render={({ field,  }) => (
                <FormItem className='flex'>
                <FormLabel className='w-40 text-lg pt-5'>Amount :</FormLabel>
                <FormControl>
                    <Input type='number' placeholder="Amount" {...field} />
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

export default ProductDataForm