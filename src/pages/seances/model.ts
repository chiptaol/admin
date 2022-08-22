import { sample } from 'effector'

import { seance } from '~entities/seance'
import { session } from '~entities/session'
import { routes } from '~shared/routes'

const currentRoute = session.model.authorizedRoute(routes.seances)

sample({
  clock: currentRoute.opened,
  source: session.model.$selectedCinema,
  filter: Boolean,
  fn: (cId) => ({ cId }),
  target: seance.model.fetchSeancesFx,
})
