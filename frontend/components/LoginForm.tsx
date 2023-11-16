'use client'
import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import  {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from './ui/card'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { IoPersonSharp } from "react-icons/io5";
import { Button } from './ui/button';


const formSchema = z.object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
      }),
  })


const LoginForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        },
      })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

  return (
    <Card className='rounded-sm border-4 h-max w-80'>
            <CardHeader>
                <CardTitle className='flex items-center justify-center gap-5 pt-12 text-3xl'>
                    <IoPersonSharp size='40'/>Login
                </CardTitle>
            </CardHeader>
            <CardContent className='pt-12'>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='password' placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='pt-2 pb-10'>
        <Button className='text-center w-full h-12 text-lg' type="submit">Submit</Button>
        </div>
      </form>
    </Form>
            </CardContent>
            
            
        </Card>
  )
}

export default LoginForm