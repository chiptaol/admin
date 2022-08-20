import { useUnit } from 'effector-react'
import { FaCrown } from 'react-icons/fa'

import { CreateOrEditHall, DeleteHall } from '~features/hall'
import { Row } from '~shared/ui'

import * as model from './model'

export const HallPage = () => {
  const hall = useUnit(model.$hall)

  if (!hall) return null

  return (
    <div className="w-full px-5 py-4">
      <div className="flex flex-col space-y-2 max-w-sm w-full">
        <Row
          label="Название"
          title={hall.title}
          EndAdornment={hall.is_vip && <FaCrown className="w-7 h-7 fill-yellow-500" />}
        />
        <Row label="Описание" title={hall.description ?? 'Описания нет'} />
        <div className="flex items-center w-full space-x-2">
          <DeleteHall />
          <CreateOrEditHall.EditButton />
        </div>
      </div>
    </div>
  )
}
