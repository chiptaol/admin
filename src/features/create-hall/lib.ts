import { cinema } from '~entities/cinema'
import { createOid } from '~shared/lib/create-oid'
import { normalizr } from '~shared/lib/normalizr'

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
  return Array.from({ length: seatsCount }).map(() => ({ id: createOid(), isVip: false }))
}

export function generateRows(rowsAmount: number): Record<number, Row> {
  return normalizr(Array.from({ length: rowsAmount }).map((_, index) => generateRow(index + 1)))
}
