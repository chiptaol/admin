import { forwardRef } from 'react'
import cn from 'classnames'

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>

export type InputProps = NativeInputProps & {
  className?: string
  isDisabled?: boolean
  isInvalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type = 'text', isDisabled = false, isInvalid, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'h-12 p-4',
          'rounded bg-gray-100',
          'border-2',
          { 'border-red-500': isInvalid },
          'focus:outline-none focus-visible:ring',
          'placeholder:opacity-0',
          className
        )}
        disabled={isDisabled}
        type={type}
        {...rest}
      />
    )
  }
)
