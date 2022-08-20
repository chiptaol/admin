import { attach, createStore } from 'effector'

import { request } from '~shared/api'
import { normalizr } from '~shared/lib/normalizr'
import { types } from '~shared/types'

export const $halls = createStore<Record<number, types.Hall>>({})

export const fetchHallsFx = attach({ effect: request.fetchHallsRequestFx })
export const createHallFx = attach({ effect: request.createHallRequestFx })
export const editHallFx = attach({ effect: request.editHallRequestFx })
export const deleteHallFx = attach({ effect: request.deleteHallRequestFx })

$halls
  .on(fetchHallsFx.doneData, (_, { answer }) => normalizr(answer.data))
  .on([createHallFx.doneData, editHallFx.doneData], (halls, { answer }) => {
    return { ...halls, [answer.data.id]: answer.data }
  })
  .on(deleteHallFx.done, (halls, { params }) => {
    const { [params.hId]: _, ...next } = halls

    return next
  })
