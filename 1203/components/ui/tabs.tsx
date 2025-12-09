import * as React from 'react'

interface TabsContextValue {
  value: string
  setValue: (v: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

interface TabsRootProps {
  value: string
  onValueChange: (v: string) => void
  children: React.ReactNode
  className?: string
}

export function Tabs({ value, onValueChange, children, className = '' }: TabsRootProps) {
  return (
    <TabsContext.Provider value={{ value, setValue: onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({
  children,
  className = '',
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        'inline-flex items-center justify-center rounded-full bg-purple-50 p-1 ' +
        className
      }
    >
      {children}
    </div>
  )
}

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export function TabsTrigger({ value, className = '', ...props }: TabsTriggerProps) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) return null
  const selected = ctx.value === value
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={[
        'flex-1 rounded-full px-3 py-1.5 text-xs font-medium transition',
        selected
          ? 'bg-white shadow-sm text-purple-600'
          : 'text-gray-400 hover:text-purple-500',
        className,
      ].join(' ')}
      {...props}
    />
  )
}