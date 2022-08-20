import { Link, Route } from 'atomic-router-react'
import { useList } from 'effector-react'

import { CreateOrEditHall } from '~features/hall'
import { HallListItem } from '~entities/hall'
import { routes } from '~shared/routes'

import * as model from './model'
import { HallPage } from './hall'

export const HallsPage = () => {
  const halls = useList(model.$halls, {
    getKey: (hall) => hall.id,
    fn: (hall) => (
      <Link to={routes.hall.current} params={{ hId: hall.id }}>
        <HallListItem id={hall.id} />
      </Link>
    ),
    placeholder: <h4 className="text-base font-medium text-center my-5">Залов нет...</h4>,
  })

  return (
    <div className="w-full flex">
      <div className="bg-white shadow-md h-full max-w-xs w-full px-4 py-6">
        <div className="flex items-center justify-between mb-5">
          <h4 className="text-lg font-semibold">Залы</h4>
          <CreateOrEditHall.CreateButton />
        </div>
        <div className="flex flex-col space-y-1.5">{halls}</div>
      </div>
      <Route route={routes.hall.current} view={HallPage} />
      <CreateOrEditHall.Dialog />
    </div>
  )
}
