import { useUnit } from 'effector-react'

import { CreateHall } from '~features/create-hall'
import { PageLoader } from '~shared/ui'

import * as model from './model'

export const HomePage = () => {
  const isRouteOpened = useUnit(model.sessionCheckedRoute.$isOpened)

  if (!isRouteOpened) {
    return <PageLoader />
  }

  return (
    <div className="w-full h-full">
      <CreateHall />
    </div>
  )
}
