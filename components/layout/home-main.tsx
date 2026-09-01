'use client'

import cn from 'clsx'
import { usePathname } from 'next/navigation'

export function HomeMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ''
  const isEpisodeSlug = /^\/episodes\/[^/]+/.test(pathname)

  return (
    <main
      className={cn(
        'relative flex-1 contain-[inline-size]',
        isEpisodeSlug
          ? 'max-w-6xl'
          : 'max-w-2xl text:max-w-[calc(42rem+calc(var(--spacing)*85))]',
      )}
    >
      <div className='absolute w-full h-px opacity-50 bg-rurikon-border right-0 mobile:right-auto mobile:left-0 mobile:w-px mobile:h-full mobile:opacity-100 mix-blend-multiply' />
      <article
        className={cn(
          'pl-0 pt-6 mobile:pt-0 mobile:pl-6 sm:pl-10 md:pl-14',
          !isEpisodeSlug && 'max-w-2xl',
        )}
      >
        {children}
      </article>
    </main>
  )
}
