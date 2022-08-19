import { attach, sample } from 'effector'

import { CreateOrEditCinema } from '~features/cinema'
import { cinema } from '~entities/cinema'
import { session } from '~entities/session'
import { routes } from '~shared/routes'

const currentRoute = session.model.authorizedRoute(routes.cinema.edit)

const fetchCinemaFx = attach({
  source: session.model.$selectedCinema,
  effect: cinema.model.fetchCinemaFx,
  mapParams: (_: void, cId) => {
    if (!cId) throw Error('Cinema id is not defined')

    return { id: cId }
  },
})

sample({
  clock: currentRoute.opened,
  target: fetchCinemaFx,
})

sample({
  clock: fetchCinemaFx.doneData,
  fn: ({ answer }) => answer.data,
  target: CreateOrEditCinema.model.setFormValues,
})
