type ArticleTableProps = {
  head: string[]
  rows: (string | number)[][]
  align?: ('left' | 'right' | 'center')[]
}

export function ArticleTable({ head, rows, align }: ArticleTableProps) {
  const getAlign = (i: number): 'left' | 'right' | 'center' =>
    align?.[i] ?? 'left'

  const alignClass = (a: 'left' | 'right' | 'center') =>
    a === 'right' ? 'text-right' : a === 'center' ? 'text-center' : 'text-left'

  return (
    <div className='my-8 border border-rurikon-border bg-[#fefefe] overflow-x-auto'>
      <table className='w-full text-xs text-rurikon-500 border-collapse'>
        <thead>
          <tr className='border-b border-rurikon-border text-rurikon-300'>
            {head.map((col, i) => (
              <th
                key={i}
                className={`${alignClass(getAlign(i))} lowercase font-normal px-3 py-2`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className='border-b border-rurikon-border/40 last:border-0'>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`${alignClass(getAlign(ci))} px-3 py-1.5 tabular-nums`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
