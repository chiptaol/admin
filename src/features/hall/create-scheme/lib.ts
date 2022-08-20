import { cinema } from '~entities/cinema'
import { createOid } from '~shared/lib/create-oid'
import { normalizr } from '~shared/lib/normalizr'
import { types } from '~shared/types'

export type Row = {
  id: number
  order: number
  x: number
  y: number
  gapBetweenSeats: number
  seats: Record<string, Seat>
}

export type Seat = {
  isVip: boolean
  id: string
}

export const HALL_CONTAINER_WIDTH = 720

function generateRow(order: number): Row {
  return {
    id: order,
    order: order,
    gapBetweenSeats: 5,
    x: 0,
    y: (order - 1) * (cinema.config.SEAT_HEIGHT + 5),
    seats: normalizr(generateSeats(5)),
  }
}

export function generateSeats(seatsCount: number) {
  let validCount: null | number = null
  if (seatsCount > 30) validCount = 30
  return Array.from({ length: validCount ?? seatsCount }).map(() => ({
    id: createOid(),
    isVip: false,
  }))
}

export function generateRows(rowsAmount: number): Record<number, Row> {
  return normalizr(Array.from({ length: rowsAmount }).map((_, index) => generateRow(index + 1)))
}

export function normalizeRequestBody(rows: Row[]) {
  let substract = 0

  const rowsX = rows.map((row) => row.x)

  const minRowX = Math.min(...rowsX)

  if (minRowX > 50) {
    substract = minRowX - 50
  }

  return rows.reduce<types.CreateHallSeatsRequest['seats']>((acc, next) => {
    const normalizedSeats = Object.values(next.seats).map((seat, index) => ({
      is_vip: seat.isVip,
      y: next.y,
      x: index * 36 + index * next.gapBetweenSeats + next.x - substract,
      place: index + 1,
      row: next.order,
    }))

    return acc.concat(...normalizedSeats)
  }, [])
}
