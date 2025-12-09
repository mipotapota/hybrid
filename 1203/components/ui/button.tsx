import * as React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md'
}

export function Button({
  className = '',
  variant = 'solid',
  size = 'md',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-full font-medium transition disabled:opacity-50 disabled:cursor-not-allowed'
  const variants: Record<string, string> = {
    solid:
      'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600',
    outline:
      'border border-purple-200 text-purple-600 bg-white/60 hover:bg-purple-50',
  }
  const sizes: Record<string, string> = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
  }
  return (
    <button
      className={[base, variants[variant], sizes[size], className].join(' ')}
      {...props}
    />
  )
}