'use client'
import Link from 'next/link'
import { useEffect, useState } from "react"
import { Button } from '../components/ui/button'

export default function Home() {
  let dashboardBtn
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState('')
  useEffect(() => {
    (
      async () => {
        try {
        const resp = await fetch('http://localhost:8000/api/me/',{
          credentials: 'include'
        })
        if (resp.ok){
          setAuth(true)
          const data = await resp.json()
          setUser(data['first_name'])
        }else{
          setAuth(false)
        }
      } catch(e){
        console.log('connection failed')
      }
      }
    )()
  })

  if (auth === true){
    dashboardBtn = (
      <div className='pl-4'>
      <h2 className='text-4xl text-left'>Welcome {user} !!</h2>
      <h2 className='text-left pt-1'>See how the management is going</h2>
      <div className='pt-4'>
      <Link href='/dashboard'><Button className="rounded-[9999px] h-16 w-40 text-xl hover:border-2">Dashboard</Button></Link>
      </div>
      </div>
    )
  }
  else{
    dashboardBtn = (
      <div className='pl-4'>
      <h2 className='text-4xl text-left'>Manage your Products</h2>
      <h2 className='text-left pt-1'>with our Product Management system</h2>
      <div className='pt-4'>
      <Link href='/login'><Button className="rounded-[9999px] h-16 w-40 text-xl hover:border-2">Login</Button></Link>
      </div>
      </div>
    )
  }
  return (
    <div className='flex-col flex-auto flex justify-center items-center'>
      {dashboardBtn}
    </div>
  )
}
