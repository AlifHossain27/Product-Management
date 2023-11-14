import Image from 'next/image'
import Sidebar from '@/components/Sidebar'
export default function Home() {
  return (
    <main className='flex gap-6'>
      <Sidebar/>
    </main>
  )
}
