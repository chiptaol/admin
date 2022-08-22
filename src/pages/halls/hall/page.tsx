import { variant } from '@effector/reflect'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { FaCrown } from 'react-icons/fa'
import { HallSeats } from '~entities/hall'

import { CreateOrEditHall, DeleteHall } from '~features/hall'
import { routes } from '~shared/routes'
import { Button, PageLoader, Row } from '~shared/ui'

import * as model from './model'

export const HallPage = () => {
  const hall = useUnit(model.$hall)

  if (!hall) return null

  return (
    <div className="w-full px-5 py-4">
      <div className="flex flex-col space-y-2 max-w-sm w-full mb-5">
        <Row
          label="Название"
          title={hall.title}
          EndAdornment={hall.is_vip && <FaCrown className="w-7 h-7 fill-yellow-500" />}
        />
        <Row label="Форматы" title={hall.formats.map((format) => format.title).join(', ')} />
        <Row label="Описание" title={hall.description ?? 'Описания нет'} />
        <div className="flex items-center w-full space-x-2">
          <DeleteHall />
          <CreateOrEditHall.EditButton />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <h4 className="text-lg font-medium">Схема зала</h4>
        <PageContent />
      </div>
    </div>
  )
}

const EmptyPage = () => {
  const hall = useUnit(model.$hall)

  return (
    <div className="flex flex-col space-y-2 w-44">
      <h4 className="text-base font-medium">Схемы нет...</h4>
      <Link to={routes.hall.seats} params={{ hId: hall.id }}>
        <Button className="w-full">Создать</Button>
      </Link>
    </div>
  )
}

const PageContent = variant({
  source: model.$pageContent,
  cases: {
    pending: PageLoader,
    empty: EmptyPage,
    ready: HallSeats,
  },
})
