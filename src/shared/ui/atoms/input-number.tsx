import { GoChevronUp, GoChevronDown } from 'react-icons/go'

type Props = {
  value: number
  onIncrement: () => void
  onDecrement: () => void
}

export const InputNumber = (props: Props) => {
  return (
    <div className="flex items-center space-x-0">
      <Input value={props.value} />
      <Button onClick={props.onIncrement}>
        <GoChevronUp />
      </Button>
      <Button disabled={props.value === 0} className="rounded-r" onClick={props.onDecrement}>
        <GoChevronDown />
      </Button>
    </div>
  )
}

const Button = ({
  children,
  onClick,
  className = '',
  disabled = false,
}: {
  onClick: () => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`border border-gray-300 text-sm text-black bg-slate-200 w-8 h-8 flex justify-center items-center ${className}`}
    >
      {children}
    </button>
  )
}

const Input = ({ value }: Pick<Props, 'value'>) => {
  return (
    <input
      type="number"
      value={value}
      readOnly
      className="h-8 w-12 border border-gray-300 text-sm text-black bg-slate-100 px-2 rounded-l"
    />
  )
}
