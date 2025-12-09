import * as React from 'react'

export function Separator({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={'h-px w-full bg-gradient-to-r from-transparent via-purple-100 to-transparent ' + className}
      {...props}
    />
  )
}