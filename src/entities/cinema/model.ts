import { attach, createStore } from 'effector'

import { request } from '~shared/api'
import { normalizr } from '~shared/lib/normalizr'
import { types } from '~shared/types'

export const $cinemas = createStore<Record<number, types.Cinema>>({})

export const fetchCinemasFx = attach({ effect: request.fetchCinemasRequestFx })

$cinemas.on(fetchCinemasFx.doneData, (_, { answer }) => normalizr(answer.data))
