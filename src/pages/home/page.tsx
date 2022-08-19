import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { DeleteCinema } from '~features/cinema'
import { CinemaPaper } from '~entities/cinema'
import { routes } from '~shared/routes'
import { Button, PageLoader } from '~shared/ui'

import * as model from './model'

export const HomePage = () => {
  const isRouteOpened = useUnit(model.sessionCheckedRoute.$isOpened)

  if (!isRouteOpened) {
    return <PageLoader />
  }

  return (
    <div className="w-full h-full px-5 py-6 flex flex-col space-y-5">
      <CinemaPaper />
      <div className="max-w-sm w-full space-x-2 flex items-center">
        <Link to={routes.cinema.edit} className="w-full">
          <Button className="w-full">Редактировать</Button>
        </Link>
        <DeleteCinema />
      </div>
    </div>
  )
}
