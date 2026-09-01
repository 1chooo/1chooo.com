import type { ReactNode } from 'react'
import cn from 'clsx'

interface FootNoteRefProps {
  number: number
  id?: string
}

export function FootNoteRef({ number, id }: FootNoteRefProps) {
  const href = id ? `#${id}` : `#fn-${number}`
  return (
    <sup>
      <a
        href={href}
        className='text-rurikon-300 hover:text-rurikon-500 no-underline transition-colors'
        aria-label={`Footnote ${number}`}
      >
        {number}
      </a>
    </sup>
  )
}

interface FootNoteProps {
  note: ReactNode
  number?: number
  id?: string
}

export function FootNote({ note, number, id }: FootNoteProps) {
  const resolvedId = id ?? (number !== undefined ? `fn-${number}` : undefined)
  return (
    <span
      id={resolvedId}
      className={cn(
        'sidenote block relative mt-3.5 mb-7 mx-auto text-left text-pretty w-[80%] text-xs sm:text-sm leading-5 sm:leading-6 text-rurikon-400',
        'text:inline text:float-right text:clear-right text:w-[50%] text:-mr-[50%] text:mt-0 text:pl-7'
      )}
    >
      <span className='sr-only'>Footnote: </span>
      {number !== undefined && (
        <sup className='mr-1 text-rurikon-300'>{number}</sup>
      )}
      {note}
    </span>
  )
}
