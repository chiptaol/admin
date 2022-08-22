type NativeSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

type Props = NativeSelectProps & {
  children: React.ReactNode
  className?: string
}

export const Select = ({ children, className = '', ...props }: Props) => {
  return (
    <select
      className={`bg-gray-100 px-4 py-2.5 rounded border-2 border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}
