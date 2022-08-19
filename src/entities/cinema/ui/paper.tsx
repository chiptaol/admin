import { useUnit } from 'effector-react'
import { MdMovie } from 'react-icons/md'
import { Row } from '~shared/ui'

import * as model from '../model'

export const CinemaPaper = () => {
  const cinema = useUnit(model.$cinema)

  if (!cinema) return null

  return (
    <div className="max-w-6xl w-full">
      <div className="flex items-center space-x-6">
        {cinema.logo ? (
          <img src={cinema.logo.path} alt="cinema logo w-10 h-10 rounded" />
        ) : (
          <MdMovie className="fill-blue-800 w-10 h-10" />
        )}
        <div className="flex items-center space-x-2 max-w-md w-full">
          <Row label="title" title={cinema.title} />
          <Row label="phone" title={cinema.phone} />
        </div>
      </div>
    </div>
  )
}
