import { combine, createEvent, sample } from 'effector'

import { cinema } from '~entities/cinema'
import { session } from '~entities/session'

export const cinemaSelected = createEvent<number>()

export const $cinema = combine(
  session.model.$selectedCinema,
  cinema.model.$cinemas,
  (cId, cinemas) => (cId ? cinemas[cId] ?? null : null)
)
export const $cinemasList = cinema.model.$cinemas.map((cinemas) => Object.keys(cinemas).map(Number))

sample({
  clock: cinemaSelected,
  target: session.model.cinemaSelected,
})
