import { attach, createApi, createStore } from 'effector'

import { request } from '~shared/api'
import { normalizr } from '~shared/lib/normalizr'
import { types } from '~shared/types'

export const $halls = createStore<Record<number, types.Hall>>({})
export const $hall = createStore<types.Hall | null>(null)
export const $hallSeats = createStore<types.Seat[]>([])

export const $hallRows = $hallSeats.map((seats) => {
  const rows = seats.reduce<Record<number, number>>((acc, next) => {
    acc[next.row] = next.y
    return acc
  }, {})
  return rows
})
export const $biggestRow = $hallSeats.map((seats) => {
  const rows = seats.reduce<Record<number, number>>((acc, next) => {
    acc[next.row] = (acc[next.row] ?? 0) + 1
    return acc
  }, {})

  return Math.max(...Object.values(rows).map(Number)) * 41
})
export const $scale = createStore(1)
export const scale = createApi($scale, {
  increment: (amount) => (amount >= 2 ? amount : amount + 0.1),
  decrement: (amount) => (amount <= 0.5 ? amount : amount - 0.1),
})

export const fetchHallsFx = attach({ effect: request.fetchHallsRequestFx })
export const fetchHallFx = attach({ effect: request.fetchHallRequestFx })
export const createHallFx = attach({ effect: request.createHallRequestFx })
export const editHallFx = attach({ effect: request.editHallRequestFx })
export const deleteHallFx = attach({ effect: request.deleteHallRequestFx })
export const fetchHallSeatsFx = attach({ effect: request.fetchHallSeatsRequestFx })

$halls
  .on(fetchHallsFx.doneData, (_, { answer }) => normalizr(answer.data))
  .on([createHallFx.doneData, editHallFx.doneData], (halls, { answer }) => {
    return { ...halls, [answer.data.id]: answer.data }
  })
  .on(deleteHallFx.done, (halls, { params }) => {
    const { [params.hId]: _, ...next } = halls

    return next
  })
$hall.on(fetchHallFx.doneData, (_, { answer }) => answer.data)
$hallSeats.on(fetchHallSeatsFx.doneData, (_, { answer }) => [...answer.data])
$scale.on($biggestRow, (scale, biggestRow) => (biggestRow > 500 ? 500 / biggestRow : 1))
