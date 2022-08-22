import { useRouter } from 'atomic-router-react'
import dayjs from 'dayjs'
import { useStoreMap } from 'effector-react'
import { types } from '~shared/types'

import * as model from '../model'

type Props = {
  id: number
}

const BASE_URL = import.meta.env.VITE_APP_SERVER_BASE_ENDPOINT

export const SeanceCard = (props: Props) => {
  const seance = useStoreMap({
    store: model.$seances,
    keys: [props.id],
    defaultValue: null,
    fn: (seances, [id]) => seances.find((s) => s.id === +id),
  })

  if (!seance) return null

  return (
    <div className="max-w-md w-full rounded border border-gray-200 shadow-md px-6 py-4">
      <Row label="Название фильма" title={seance.movie.title} />
      <Hr />
      <Row label="Жанры" title={seance.movie.genres.join(', ')} />
      <Hr />
      <Row label="Цена" title={beautifyPrice(seance.prices)} />
      <Hr />
      <div className="flex space-x-1 w-full">
        <div className="w-1/2">
          <Row
            label="Дата и время сеанса"
            title={dayjs(seance.start_date_time, 'YYYY-MM-DD HH:mm:ss').format('DD.MM | HH:mm')}
          />
          <Hr />
          <Row label="Формат" title={seance.format.title} />
          <Hr />
          <Row label="Зал" title={seance.hall.title} />
          <Hr />
        </div>
        {seance.movie.poster_path ? (
          <img
            className="w-1/2 rounded flex-grow object-contain"
            src={`${BASE_URL}/${seance.movie.poster_path}`}
          />
        ) : (
          <div className="w-1/2 bg-blue-100 rounded h-72 flex justify-center items-center">404</div>
        )}
      </div>
    </div>
  )
}

type RowProps = {
  label: string
  title: string
}

const Row = (props: RowProps) => {
  return (
    <div className="flex flex-col space-y-0.5 px-2.5 py-2">
      <span className="text-sm text-gray-400">{props.label}</span>
      <p className="text-base font-medium">{props.title}</p>
    </div>
  )
}

const Hr = () => <hr className="w-full bg-gray-200" />

function beautifyPrice(price: types.Seance['prices']) {
  return `Стандарт: ${
    price.standard ? new Intl.NumberFormat().format(price.standard / 100) + ' Сум' : '-'
  } | VIP: ${price.vip ? new Intl.NumberFormat().format(price.vip / 100) + ' Сум' : '-'}`
}
