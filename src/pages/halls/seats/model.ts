import { attach, sample } from 'effector'

import { hall } from '~entities/hall'
import { session } from '~entities/session'
import { CreateHallScheme } from '~features/hall'
import { request } from '~shared/api'
import { showErrorToastFx, showSuccessToastFx } from '~shared/lib/toast'
import { routes } from '~shared/routes'

const currentRoute = session.model.authorizedRoute(routes.hall.seats)

const createHallSchemeFx = attach({ effect: request.createHallSeatsRequestFx })
const fetchSeatsFx = attach({ effect: hall.model.fetchHallSeatsFx })

sample({
  clock: currentRoute.opened,
  source: session.model.$selectedCinema,
  filter: Boolean,
  fn: (cId, { params }) => ({ hId: params.hId, cId }),
  target: [hall.model.fetchHallFx, fetchSeatsFx],
})

sample({
  clock: fetchSeatsFx.doneData,
  filter: ({ answer }) => answer.data.length > 0,
  target: routes.notFound.open,
})

sample({
  clock: CreateHallScheme.model.formValidated,
  source: hall.model.fetchHallFx.done,
  fn: ({ params }, seats) => ({ seats, ...params }),
  target: createHallSchemeFx,
})

sample({
  clock: createHallSchemeFx.done,
  fn: ({ params }) => ({ hId: params.hId }),
  target: [routes.hall.current.open, showSuccessToastFx.prepend(() => ({ title: 'Сохранено' }))],
})

sample({
  clock: createHallSchemeFx.fail,
  target: showErrorToastFx.prepend(() => ({ title: 'Произошла ошибка' })),
})
