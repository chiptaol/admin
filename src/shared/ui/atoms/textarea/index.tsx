import { forwardRef } from 'react'
import cn from 'classnames'

type NativeTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

type TextareaProps = NativeTextareaProps & {
  className?: string
  isDisabled?: boolean
  isInvalid?: boolean
  label: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', isDisabled = false, isInvalid = false, label, ...rest }, ref) => {
    return (
      <label className="relative block w-full text-gray-500">
        <textarea
          ref={ref}
          className={cn(
            'max-h-40 min-h-[120px] w-full py-2 px-4',
            'rounded bg-gray-100',
            'border-2',
            { 'border-red-500': isInvalid },
            'focus:outline-none focus-visible:ring',
            'placeholder:opacity-0',
            className
          )}
          disabled={isDisabled}
          placeholder={label}
          {...rest}
        />
      </label>
    )
  }
)
