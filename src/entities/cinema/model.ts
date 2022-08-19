import { attach, createStore } from 'effector'

import { request } from '~shared/api'
import { normalizr } from '~shared/lib/normalizr'
import { types } from '~shared/types'

export const $cinemas = createStore<Record<number, types.Cinema>>({})
export const $cinema = createStore<null | types.Cinema>(null)

export const fetchCinemasFx = attach({ effect: request.fetchCinemasRequestFx })
export const fetchCinemaFx = attach({ effect: request.fetchCinemaRequestFx })

$cinemas.on(fetchCinemasFx.doneData, (_, { answer }) => normalizr(answer.data))
$cinema.on(fetchCinemaFx.doneData, (_, { answer }) => answer.data)
