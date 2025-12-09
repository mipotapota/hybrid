import * as React from 'react'

export function Card({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        'rounded-2xl border border-gray-100 bg-white/80 shadow-sm ' + className
      }
      {...props}
    />
  )
}

export function CardContent({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={'p-4 ' + className} {...props} />
}