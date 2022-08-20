import { GoChevronUp, GoChevronDown } from 'react-icons/go'

type Props = {
  value: number | string
  isDisabled?: boolean
  onIncrement: () => void
  onDecrement: () => void
  limit?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputNumber = (props: Props) => {
  return (
    <div className="flex items-center space-x-0">
      <Input onChange={props.onChange} value={props.value} />
      <Button
        disabled={props.limit === props.value || props.isDisabled}
        onClick={props.onIncrement}
      >
        <GoChevronUp />
      </Button>
      <Button
        disabled={props.value === 0 || props.isDisabled}
        className="rounded-r"
        onClick={props.onDecrement}
      >
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

const Input = ({ value, onChange }: Pick<Props, 'value' | 'onChange'>) => {
  return (
    <input
      type="number"
      value={value}
      readOnly={typeof onChange === 'undefined'}
      onChange={onChange}
      className="h-8 w-12 border border-gray-300 text-sm text-black bg-slate-100 px-2 rounded-l hide-input-spin-button"
    />
  )
}
