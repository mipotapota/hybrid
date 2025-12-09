import * as React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'outline' | 'solid'
}

export function Badge({ className = '', variant = 'outline', ...props }: BadgeProps) {
  const base =
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium'
  const variants: Record<string, string> = {
    outline: 'border-purple-200 text-purple-600 bg-white/60',
    solid: 'border-transparent bg-purple-500 text-white',
  }
  return (
    <span className={[base, variants[variant], className].join(' ')} {...props} />
  )
}