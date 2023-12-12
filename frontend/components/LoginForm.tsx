'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import  {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from './ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { IoPersonSharp } from "react-icons/io5";
import { Button } from './ui/button';
import { logIn, logOut } from '@/redux/features/auth-slice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'


const formSchema = z.object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    password: z.string().min(4, {
        message: "Password must be at least 6 characters.",
      }),
  })
const LoginForm = () => {
    const { toast } = useToast()
    const router= useRouter()
    const dispatcher = useDispatch<AppDispatch>()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: "",
        },
      })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values.username)
        const username = values.username
        const password = values.password
        
        const res = await fetch('http://localhost:8000/api/login/', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          credentials: 'include',
          body: JSON.stringify({
            'username': username,
            'password': password
          })
        });
        if (res.ok){
          await router.push('/')
          toast({
            title: `Welcome ${username}`,
            description: "Successfully logged in",
          })
          dispatcher(logIn())
        }else{
          toast({
            variant: "destructive",
            title: `${res.status} Login failed`,
            description: "Incorrect username or password",
          })
          dispatcher(logOut())
        }
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
                <Input autoComplete='off' placeholder="Username" {...field} />
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
        <Button className='text-center w-full h-12 text-lg' type="submit" >Login</Button>
        </div>
      </form>
    </Form>
            </CardContent>
            
            
        </Card>
  )
}

export default LoginForm