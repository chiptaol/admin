import { sample } from 'effector'

import { hall } from '~entities/hall'
import { session } from '~entities/session'
import { routes } from '~shared/routes'

const currentRoute = session.model.authorizedRoute(routes.halls)

export const $halls = hall.model.$halls.map((halls) => Object.values(halls))

sample({
  clock: currentRoute.opened,
  source: session.model.$selectedCinema,
  filter: Boolean,
  fn: (cId) => ({ cId }),
  target: hall.model.fetchHallsFx,
})
