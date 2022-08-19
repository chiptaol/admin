import { sample } from 'effector'

import { cinema } from '~entities/cinema'
import { session } from '~entities/session'
import { routes } from '~shared/routes'

const currentRoute = routes.home
export const sessionCheckedRoute = session.model.authorizedRoute(currentRoute)

sample({
  clock: sessionCheckedRoute.opened,
  source: session.model.$selectedCinema,
  filter: Boolean,
  fn: (cId) => ({ id: cId }),
  target: cinema.model.fetchCinemaFx,
})
