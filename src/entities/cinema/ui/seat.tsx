type Props = {
  isVip: boolean
  onClick?: () => void
  place: number
}

export const Seat = ({ isVip, onClick, place }: Props) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`
      h-9 w-9 rounded-md shadow-sm 
      flex justify-center items-center 
      ${isVip ? 'bg-green-400' : 'bg-blue-400'} 
      text-white text-sm`}
    >
      {place}
    </button>
  )
}
