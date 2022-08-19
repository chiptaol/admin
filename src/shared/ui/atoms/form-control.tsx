type Props = {
  children: React.ReactNode
  label: string
  isInvalid?: boolean
  errorText?: string
}

export const FormControl = (props: Props) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="flex flex-col space-y-2 font-medium">
        <span className="text-sm">{props.label}</span>
        {props.children}
      </label>
      {props.isInvalid && <span className="text-sm text-red-500">{props.errorText}</span>}
    </div>
  )
}
