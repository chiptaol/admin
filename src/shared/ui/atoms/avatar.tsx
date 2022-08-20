type Props = {
  name: string
  className?: string
}

export const Avatar = ({ name, className }: Props) => {
  return (
    <div
      className={`w-12 h-12 flex justify-center items-center rounded-full bg-blue-500 border-2 border-blue-300 ${className}`}
    >
      <span className="text-xl text-white">{name[0].toUpperCase()}</span>
    </div>
  )
}
