import { useStoreMap } from 'effector-react'
import { MdMovie } from 'react-icons/md'

import { IMAGE_BASE_SRC } from '../config'
import * as model from '../model'

type Props = {
  cinemaId: number
  onClick: () => void
}

export const CinemaListItem = (props: Props) => {
  const cinema = useStoreMap({
    store: model.$cinemas,
    keys: [props.cinemaId],
    defaultValue: null,
    fn: (cinemas, [cId]) => cinemas[cId],
  })

  if (!cinema) return null

  return (
    <button
      onClick={props.onClick}
      className="flex items-center space-x-2 px-3 py-2 transition-colors w-full hover:bg-slate-100 hover:text-black"
    >
      {cinema.logo?.path ? (
        <img
          className="w-7 h-7 object-contain rounded"
          src={`${IMAGE_BASE_SRC}${cinema.logo.path}`}
          alt="cinema-logo"
        />
      ) : (
        <MdMovie className="w-7 h-7 fill-blue-800" />
      )}
      <span className="text-base">{cinema.title}</span>
    </button>
  )
}
