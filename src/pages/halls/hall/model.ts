import { combine, sample } from 'effector'

import { hall } from '~entities/hall'
import { session } from '~entities/session'
import { routes } from '~shared/routes'

const currentRoute = routes.hall.current

export const $hall = combine(
  currentRoute.$params,
  hall.model.$halls,
  (params, halls) => halls[params.hId] ?? null
)
export const $pageContent = combine(
  hall.model.fetchHallSeatsFx.pending,
  hall.model.$hallSeats,
  (pending, seats) => {
    if (pending) return 'pending'
    if (seats.length === 0) return 'empty'

    return 'ready'
  }
)

sample({
  clock: [currentRoute.opened, currentRoute.updated],
  source: { cId: session.model.$selectedCinema, hId: currentRoute.$params.map(({ hId }) => hId) },
  filter: ({ cId }) => cId !== null,
  fn: ({ cId, hId }) => ({ cId: cId!, hId }),
  target: hall.model.fetchHallSeatsFx,
})
