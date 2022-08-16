import { combine, createApi, createEvent, createStore, restore, sample } from 'effector'

import { normalizr } from '~shared/lib/normalizr'

import * as lib from './lib'
import type { Row } from './lib'

export const $rowsAmount = createStore(0)
export const activeRowChanged = createEvent<number>()
export const seatsAmountChanged = createEvent<number>()

export const $rows = createStore<Record<number, Row>>({})
export const $rowsList = $rows.map((rows) => Object.keys(rows).map(Number))
export const $activeRow = restore(activeRowChanged, 1)
export const $activeRowsSettings = combine(
  $rows,
  $activeRow,
  (rows, activeRowOrder) => rows[activeRowOrder]
)

export const rowsAmount = createApi($rowsAmount, {
  increment: (amount) => (amount === 10 ? amount : amount + 1),
  decrement: (amount) => (amount === 0 ? amount : amount - 1),
})

$rows
  .on($rowsAmount, (_, amount) => lib.generateRows(amount))
  .on(
    sample({
      clock: seatsAmountChanged,
      source: $activeRow,
      fn: (rowOrder, seatsAmount) => ({ rowOrder, seatsAmount }),
    }),
    (rows, { rowOrder, seatsAmount }) => {
      const row = rows[rowOrder]
      if (!row) return rows
      return {
        ...rows,
        [rowOrder]: { ...row, seats: normalizr(lib.generateSeats(seatsAmount)) },
      }
    }
  )

$activeRow.watch(console.log)
