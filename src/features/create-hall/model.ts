import { combine, createApi, createEvent, createStore, restore, sample } from 'effector'

import { normalizr } from '~shared/lib/normalizr'

import * as lib from './lib'
import type { Row } from './lib'
import { cinema } from '~entities/cinema'

export const $rowsAmount = createStore(0)
export const activeRowChanged = createEvent<number>()
export const seatsAmountChanged = createEvent<number>()
export const rowVipChanged = createEvent()
export const rowMovedHorizontallyToRight = createEvent()
export const rowMovedHorizontallyToLeft = createEvent()
export const rowMovedHorizontallyToCenter = createEvent()

export const $rows = createStore<Record<number, Row>>({})
export const $rowsList = $rows.map((rows) => Object.keys(rows).map(Number))
export const $activeRow = restore(activeRowChanged, 1)
export const $activeRowsSettings = combine(
  $rows,
  $activeRow,
  (rows, activeRowOrder) => rows[activeRowOrder]
)
export const $scale = createStore(1)

export const rowsAmount = createApi($rowsAmount, {
  increment: (amount) => (amount === 10 ? amount : amount + 1),
  decrement: (amount) => (amount === 0 ? amount : amount - 1),
})
export const scale = createApi($scale, {
  increment: (amount) => (amount >= 2 ? amount : amount + 0.1),
  decrement: (amount) => (amount <= 0.5 ? amount : amount - 0.1),
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
  .on(sample({ clock: rowVipChanged, source: $activeRow }), (rows, activeRow) => {
    const row = rows[activeRow]
    if (!row) return rows

    const seats = Object.values(row.seats).map((seat) => ({ ...seat, isVip: !seat.isVip }))

    return { ...rows, [activeRow]: { ...row, seats: normalizr(seats) } }
  })
  .on(
    sample({
      clock: rowMovedHorizontallyToRight,
      source: $activeRow,
    }),
    (rows, activeRow) => {
      const row = rows[activeRow]
      if (!row) return rows
      const currentRowWidth = calculateRowWidth(row)
      const tallestRowWidth = calculateTallestRowWidth(Object.values(rows))

      if (tallestRowWidth <= currentRowWidth && currentRowWidth >= lib.HALL_CONTAINER_WIDTH)
        return rows

      return {
        ...rows,
        [activeRow]: {
          ...row,
          x: row.x + 1,
        },
      }
    }
  )
  .on(sample({ clock: rowMovedHorizontallyToLeft, source: $activeRow }), (rows, activeRow) => {
    const row = rows[activeRow]
    if (!row || row?.x === 0) return rows

    return {
      ...rows,
      [activeRow]: {
        ...row,
        x: row.x - 1,
      },
    }
  })
  .on(sample({ clock: rowMovedHorizontallyToCenter, source: $activeRow }), (rows, activeRow) => {
    const row = rows[activeRow]
    if (!row) return rows
    const currentRowWidth = calculateRowWidth(row)
    const tallestRowWidth = calculateTallestRowWidth(Object.values(rows))
    if (tallestRowWidth <= currentRowWidth && currentRowWidth >= lib.HALL_CONTAINER_WIDTH)
      return rows

    const tallestWidth =
      tallestRowWidth > lib.HALL_CONTAINER_WIDTH ? tallestRowWidth : lib.HALL_CONTAINER_WIDTH
    console.log(tallestRowWidth)

    const rowX = (tallestWidth - currentRowWidth) / 2

    if (rowX === row.x) return rows

    return {
      ...rows,
      [activeRow]: {
        ...row,
        x: rowX,
      },
    }
  })

function calculateTallestRowWidth(rows: lib.Row[]) {
  const rowsX = rows.map((row) => calculateRowWidth(row))

  return Math.max(...rowsX)
}

function calculateRowWidth(row: lib.Row) {
  const seatsAmount = Object.keys(row.seats).length

  return seatsAmount * cinema.config.SEAT_WIDTH + seatsAmount * row.gapBetweenSeats
}
