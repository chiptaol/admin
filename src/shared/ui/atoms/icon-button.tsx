import cn from 'classnames'

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'disabled'
>

type Props = NativeButtonProps & {
  /**
   * A11y: A label that describes the button
   */
  'aria-label': string
  children: React.ReactNode
  className?: string
  isDisabled?: boolean
  isLoading?: boolean
}

const IconButton = (props: Props) => {
  const { children, type = 'button', className = '', ...rest } = props
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cn('flex justify-center items-center p-0 rounded', className)}
      {...rest}
    >
      {children}
    </button>
  )
}

export { IconButton }
