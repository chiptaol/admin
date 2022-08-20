import { types } from '~shared/types'

type Props = {
  seat: types.Seat
}

export const Seat = ({ seat }: Props) => {
  return (
    <button
      type="button"
      style={{
        top: seat.y,
        left: seat.x,
      }}
      className={`
        absolute 
        h-9 w-9 rounded-md shadow-sm 
        flex justify-center items-center 
        ${seat.is_vip ? 'bg-green-400' : 'bg-blue-400'} 
        text-white text-sm`}
    >
      {seat.place}
    </button>
  )
}
