type Props = {
  children: React.ReactNode
  label: string
}

export const FormControl = (props: Props) => {
  return (
    <div className="">
      <label className="flex flex-col space-y-2">
        <span className="text-sm">{props.label}</span>
        {props.children}
      </label>
    </div>
  )
}
