import { useList, useStore, useStoreMap } from 'effector-react'

import { CinemaHallScreen, Seat } from '~entities/cinema'

import { Settings } from './settings'

import * as model from '../model'
import { HALL_CONTAINER_WIDTH } from '../lib'

export const CreateHall = () => {
  return (
    <div className="flex space-x-5 p-6">
      <Settings />
      <div className="flex flex-col space-y-4 w-max h-max relative">
        <CinemaHallScreen />
        <Container>
          <ZoomContainer>
            <Rows />
          </ZoomContainer>
        </Container>
        <Zoom />
      </div>
    </div>
  )
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ width: HALL_CONTAINER_WIDTH }}
      className="h-[600px] overflow-auto flex-2 relative"
    >
      {children}
    </div>
  )
}

const ZoomContainer = ({ children }: { children: React.ReactNode }) => {
  const scale = useStore(model.$scale)
  return <div style={{ transformOrigin: '0 0', transform: `scale(${scale})` }}>{children}</div>
}

const Rows = () => {
  const rows = useList(model.$rowsList, (row) => <SeatsRow key={row} rowOrder={row} />)

  return <>{rows}</>
}

const SeatsRow = ({ rowOrder }: { rowOrder: number }) => {
  const row = useStoreMap({
    defaultValue: null,
    store: model.$rows,
    keys: [rowOrder],
    fn: (rows, [order]) => rows[order],
  })

  if (!row) return null

  const { seats, gapBetweenSeats } = row

  return (
    <div style={{ top: row.y, left: row.x }} className="flex items-center w-max absolute">
      {Object.values(seats).map((seat, index) => (
        <div key={seat.id} style={{ marginLeft: index !== 0 ? gapBetweenSeats : 0 }}>
          <Seat isVip={seat.isVip} place={index + 1} />
        </div>
      ))}
    </div>
  )
}

const Zoom = () => {
  return (
    <div className="flex flex-col space-y-0 absolute top-16 -right-12">
      <button
        onClick={() => model.scale.increment()}
        className="flex justify-center items-center rounded border border-gray-200 bg-slate-50 h-10 w-10"
      >
        +
      </button>
      <button
        onClick={() => model.scale.decrement()}
        className="flex justify-center items-center rounded border border-gray-200 bg-slate-50 h-10 w-10"
      >
        -
      </button>
    </div>
  )
}
