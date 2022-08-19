import { useUnit } from 'effector-react'

import { CinemaPaper } from '~entities/cinema'
import { PageLoader } from '~shared/ui'

import * as model from './model'

export const HomePage = () => {
  const isRouteOpened = useUnit(model.sessionCheckedRoute.$isOpened)

  if (!isRouteOpened) {
    return <PageLoader />
  }

  return (
    <div className="w-full h-full px-5 py-6">
      <CinemaPaper />
    </div>
  )
}
