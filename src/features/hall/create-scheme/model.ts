import { combine, createApi, createDomain, createEvent, restore, sample } from 'effector'

import { cinema } from '~entities/cinema'
import { types } from '~shared/types'
import { normalizr } from '~shared/lib/normalizr'

import * as lib from './lib'
import type { Row } from './lib'
import { routes } from '~shared/routes'

const domain = createDomain()

domain.onCreateStore((store) => store.reset(routes.hall.seats.closed))

export const activeRowChanged = createEvent<number>()
export const seatsAmountChanged = createEvent<number>()
export const rowVipChanged = createEvent<boolean>()
export const rowMovedHorizontallyToRight = createEvent()
export const rowMovedHorizontallyToLeft = createEvent()
export const rowMovedHorizontallyToCenter = createEvent()
export const rowMovedVerticallyToUp = createEvent()
export const rowMovedVerticallyToBottom = createEvent()
export const seatClicked = createEvent<{ seatId: string; rowOrder: number }>()
export const submitButtonClicked = createEvent()
export const formValidated = createEvent<types.CreateHallSeatsRequest['seats']>()

export const $rowsAmount = domain.createStore(0)
export const $rows = domain.createStore<Record<number, Row>>({})
export const $rowsList = $rows.map((rows) => Object.keys(rows).map(Number))
export const $activeRow = restore(activeRowChanged, 1).reset(routes.hall.seats.closed)
export const $activeRowsSettings = combine(
  $rows,
  $activeRow,
  (rows, activeRowOrder) => rows[activeRowOrder]
)
export const $scale = domain.createStore(1)
export const $isRowsAmountSelected = $rowsAmount.map((amount) => amount > 0)

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
  .on(
    sample({
      clock: rowVipChanged,
      source: $activeRow,
      fn: (activeRow, isVip) => ({ activeRow, isVip }),
    }),
    (rows, { activeRow, isVip }) => {
      const row = rows[activeRow]
      if (!row) return rows

      const seats = Object.values(row.seats).map((seat) => ({ ...seat, isVip }))

      return { ...rows, [activeRow]: { ...row, seats: normalizr(seats) } }
    }
  )
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
  .on(seatClicked, (rows, { rowOrder, seatId }) => {
    const row = rows[rowOrder]

    if (!row) return rows

    const seat = row.seats[seatId]

    if (!seat) return rows

    return {
      ...rows,
      [row.id]: {
        ...row,
        seats: {
          ...row.seats,
          [seat.id]: {
            ...seat,
            isVip: !seat.isVip,
          },
        },
      },
    }
  })
  .on(
    sample({
      clock: rowMovedVerticallyToUp,
      source: $activeRow,
    }),
    (rows, activeRow) => {
      const row = rows[activeRow]

      if (!row) return rows
      const isFirstRow = row.order === 1
      if (isFirstRow && row.y === 0) return rows

      const prevRow = rows[activeRow - 1]
      const prevRowY = (prevRow?.y ?? 0) + (prevRow ? 41 : 0)

      if (prevRowY === row.y) return rows

      return {
        ...rows,
        [row.id]: {
          ...row,
          y: row.y - 1,
        },
      }
    }
  )
  .on(
    sample({
      clock: rowMovedVerticallyToBottom,
      source: $activeRow,
    }),
    (rows, activeRow) => {
      const row = rows[activeRow]

      if (!row || row.y > 600) return rows

      const nextRows = Object.values(rows).slice(row.order - 1)
      const lastRow = nextRows[nextRows.length - 1]

      if (lastRow.y > 600) return rows

      const movedRows = nextRows.map((row) => ({ ...row, y: row.y + 1 }))

      return {
        ...rows,
        ...normalizr(movedRows),
      }
    }
  )

function calculateTallestRowWidth(rows: lib.Row[]) {
  const rowsX = rows.map((row) => calculateRowWidth(row))

  return Math.max(...rowsX)
}

function calculateRowWidth(row: lib.Row) {
  const seatsAmount = Object.keys(row.seats).length

  return seatsAmount * cinema.config.SEAT_WIDTH + seatsAmount * row.gapBetweenSeats
}

sample({
  clock: submitButtonClicked,
  source: $rows,
  filter: $isRowsAmountSelected,
  fn: (rows) => lib.normalizeRequestBody(Object.values(rows)),
  target: formValidated,
})
