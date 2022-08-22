import { attach, createStore } from 'effector'

import { request } from '~shared/api'
import { types } from '~shared/types'

export const $seances = createStore<types.Seance[]>([])

export const createSeancesFx = attach({ effect: request.createSeancesRequestFx })
export const fetchSeancesFx = attach({ effect: request.fetchSeancesRequestFx })
export const deleteSeanceFx = attach({ effect: request.deleteSeanceRequestFx })

$seances
  .on(fetchSeancesFx.doneData, (_, { answer }) => [...answer.data])
  .on(deleteSeanceFx.done, (seances, { params }) =>
    seances.filter((seance) => seance.id !== +params.sId)
  )
