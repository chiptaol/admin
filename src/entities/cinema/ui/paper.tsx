import { Placemark, Map } from '@pbe/react-yandex-maps'
import { useStoreMap, useUnit } from 'effector-react'
import { MdMovie } from 'react-icons/md'
import { Row } from '~shared/ui'

import { IMAGE_BASE_SRC } from '../config'
import * as model from '../model'

export const CinemaPaper = () => {
  const cinema = useUnit(model.$cinema)

  if (!cinema) return null

  return (
    <div className="max-w-6xl w-full">
      <div className="flex items-start space-x-6 mb-4">
        {cinema.logo ? (
          <img
            src={IMAGE_BASE_SRC + cinema.logo.path}
            className="cinema logo max-w-xs rounded object-contain"
          />
        ) : (
          <MdMovie className="fill-blue-800 w-10 h-10" />
        )}
        <div className="flex items-start flex-wrap w-full gap-2">
          <div className="flex flex-col space-y-2 max-w-xs w-full">
            <Row label="Название" title={cinema.title} />
            <Row label="Номер телефона" title={cinema.phone} />
          </div>
          <div className="flex flex-col space-y-2 max-w-xs w-full">
            <Row label="Адрес" title={cinema.address} />
            <Row label="Ориентир" title={cinema.reference_point ?? '-'} />
          </div>
        </div>
      </div>
      <Location />
    </div>
  )
}

const Location = () => {
  const coords = useStoreMap(model.$cinema, (cinema) =>
    cinema ? [+cinema.latitude, +cinema.longitude] : null
  )

  if (!coords) return null

  return (
    <div className="w-full flex flex-col space-y-2">
      <h3 className="text-lg font-semibold">Локация</h3>
      <Map width="300px" height="300px" state={{ center: coords, zoom: 15 }}>
        <Placemark geometry={coords} />
      </Map>
    </div>
  )
}
