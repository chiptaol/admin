import dayjs from 'dayjs'

import { types } from '~shared/types'

type Props = {
  seance: types.Seance
}

export const SeanceListItem = (props: Props) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 rounded border border-gray-200 shadow-md bg-white">
      <div className="flex flex-col space-y-2">
        <h4 className="text-lg font-medium">{props.seance.movie.title ?? '-'}</h4>
        <p className="text-sm font-medium text-gray-500">
          {dayjs(props.seance.start_date_time, 'YYYY-MM-DD HH:mm:ss').format('DD.MM | HH:mm')}
        </p>
      </div>
      <p className="text-sm font-medium">{props.seance.hall.title}</p>
    </div>
  )
}
