import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  className?: string
  children: React.ReactNode
  href?: string
}

type ButtonProps = ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>

const variantStyles = {
  primary: 'bg-brand-blue text-white hover:bg-brand-blue-dark shadow-sm',
  secondary: 'bg-brand-green text-white hover:bg-brand-green-dark shadow-sm',
  outline: 'bg-transparent text-brand-blue border-2 border-brand-blue hover:bg-brand-blue hover:text-white',
  ghost: 'bg-transparent text-brand-blue hover:bg-brand-blue-light',
}

const sizeStyles = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3 text-[0.95rem]',
  lg: 'px-9 py-4 text-[1.05rem]',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex justify-center items-center font-heading font-semibold rounded-full',
    'transition-all duration-300 active:scale-95',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/30 focus-visible:ring-offset-2',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-70 cursor-not-allowed active:scale-100',
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseClasses} tabIndex={disabled || loading ? -1 : undefined}>
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </Link>
    )
  }

  return (
    <button
      className={baseClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}