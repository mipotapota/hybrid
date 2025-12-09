import * as React from 'react'

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = '', ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={
        'w-full rounded-2xl border border-gray-200 bg-white/80 px-3 py-2 text-sm outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 ' +
        className
      }
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'