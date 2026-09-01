import type { Metadata } from 'next'

import Navbar from '@/components/layout/navbar'
import { HomeMain } from '@/components/layout/home-main'

export const metadata: Metadata = {
  title: { template: '%s - Lin Hugo', default: 'Lin Hugo' },
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col mobile:flex-row'>
      <Navbar />
      <HomeMain>{children}</HomeMain>
    </div>
  )
}
