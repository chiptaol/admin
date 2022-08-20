import { forwardRef } from 'react'
import cn from 'classnames'

import { Spinner } from './spinner'

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'disabled'
>

type ButtonTheme = 'primary' | 'secondary' | 'danger'
type ButtonVariant = 'solid' | 'outline'
type Theme = {
  solid: string
  outline: string
}

type ButtonProps = NativeButtonProps & {
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean
  /**
   * If `true`, the button will be disabled and spinner will be shown.
   */
  isLoading?: boolean
  /**
   * tw utility-classnames
   */
  className?: string
  /**
   * Button theme
   * @default primary
   */
  theme?: ButtonTheme
  /**
   * Button variant
   * @default solid
   */
  variant?: ButtonVariant
}

const ButtonTheme: Record<ButtonTheme, Theme> = {
  primary: {
    solid: 'text-white bg-blue-500 focus:ring-blue-300',
    outline: 'text-blue-500 border-2 border-blue-500 disabled:opacity-50 focus:ring-blue-300',
  },
  secondary: {
    solid: 'text-blue-500 bg-blue-400 focus:ring-blue-200',
    outline: 'noop',
  },
  danger: {
    solid: 'text-white bg-red-500 focus:ring-red-300',
    outline: 'text-red-500 border-2 border-red-500 disabled:opacity-50 focus:ring-red-300',
  },
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className = '',
    theme = 'primary',
    variant = 'solid',
    type = 'button',
    isLoading = false,
    isDisabled = false,
    children,
    ...rest
  } = props

  const disabled = isLoading || isDisabled
  const palette = ButtonTheme[theme][variant]

  return (
    <button
      ref={ref}
      className={cn(
        'transition-all text-base leading-5 weight-500 px-5 rounded h-10 flex justify-center items-center hover:bg-opacity-80 disabled:bg-opacity-50 focus:outline-none focus:ring focus-visible:ring',
        'mobileMax:text-body-short-01 mobileMax:h-8 mobileMax:px-3',
        palette,
        className,
        {
          'cursor-not-allowed': isDisabled,
          'cursor-wait': isLoading,
        }
      )}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
})

export { Button }
