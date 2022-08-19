type Props = {
  label: string | React.ReactNode
  title: string | React.ReactNode | number
  className?: string
  EndAdornment?: React.ReactNode
  StartAdornment?: React.ReactNode
}

export const Row = ({ label, title, className = '', EndAdornment, StartAdornment }: Props) => {
  return (
    <div
      className={`flex w-full items-center justify-between px-3 py-2 shadow-sm border border-gray-200 rounded ${className}`}
    >
      {StartAdornment}
      <div className="flex w-full flex-col space-y-0.5">
        <span className="text-sm text-gray-500 flex items-center">{label}</span>
        <p className="text-base leading-4 font-medium">{title}</p>
      </div>
      {EndAdornment}
    </div>
  )
}
