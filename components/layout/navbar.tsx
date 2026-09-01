'use client'

import cn from 'clsx'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import Link from 'next/link'

interface ItemProps extends React.ComponentProps<typeof Link> {
  liClassName?: string
  activePaths?: string[]
}

interface NavbarProps {}

function Item({ liClassName, activePaths, ...props }: ItemProps) {
  const pathname = usePathname() ?? ''
  const segment = useSelectedLayoutSegment()
  const href = props.href

  if (typeof href !== 'string') {
    throw new Error('`href` must be a string')
  }

  const matchesPath = (path: string) => {
    if (path === '/') {
      return pathname === '/' || segment === null
    }
    return pathname === path || pathname.startsWith(path + '/')
  }

  const isActive =
    matchesPath(href) || activePaths?.some(matchesPath) === true

  return (
    <li
      className={cn(
        isActive ? 'text-rurikon-800' : 'text-rurikon-300 hover:text-rurikon-600',
        'transition-colors hover:transform-none',
        '-mx-2',
        liClassName
      )}
    >
      <Link
        {...props}
        className='inline-block w-full px-2 focus-visible:outline focus-visible:outline-rurikon-400 focus-visible:rounded-xs focus-visible:outline-dotted focus-visible:text-rurikon-600'
        draggable={false}
      />
    </li>
  )
}

export default function Navbar(_: NavbarProps) {
  const isDev = process.env.NODE_ENV === 'development'

  return (
    <nav className='mobile:mr-6 sm:mr-10 md:mr-14 w-full mobile:w-16'>
      <ul className='lowercase text-right mobile:sticky top-6 sm:top-10 md:top-14 mb-6 mobile:mb-0 flex gap-2 justify-end mobile:block'>
        <Item href='/' activePaths={['/bio']}>
          About
        </Item>
        <Item href='/thoughts' activePaths={['/notes']}>
          Thoughts
        </Item>
        <Item href='/episodes'>Episodes</Item>
        <Item href='/projects'>Projects</Item>
        {isDev && <Item href='/services' liClassName='mobile:mt-4'>Services</Item>}
        {isDev && <Item href='/skills'>Skills</Item>}
        {isDev && <Item href='/drafts'>Drafts</Item>}
        {isDev && <Item href='/admin'>Admin</Item>}
      </ul>
    </nav>
  )
}
