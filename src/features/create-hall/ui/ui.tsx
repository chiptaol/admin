import { useList, useStore, useStoreMap } from 'effector-react'
import { memo } from 'react'
import { CinemaHallScreen, Seat } from '~entities/cinema'

import * as model from '../model'
import { Settings } from './settings'

export const CreateHall = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* <Container>
        <CinemaHallScreen />
        <div style={{ transformOrigin: '0 0', transform: `scale(${scale})` }}></div>
      </Container>
      <div className="flex flex-col space-y-1">
        <button onClick={() => setScale((prev) => prev + 0.1)}>zoom in</button>
        <button onClick={() => setScale((prev) => prev - 0.1)}>zoom out</button>
      </div> */}
      <Settings />
      <Container>
        <Rows />
      </Container>
    </div>
  )
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ width: 600 }} className="h-[600px] overflow-auto">
      {children}
    </div>
  )
}

const Rows = () => {
  const rows = useList(model.$rowsList, (row) => <SeatsRow rowOrder={row} />)

  return <div className="flex flex-col space-y-1">{rows}</div>
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
    <div className={`flex items-center z-10 w-max`}>
      {Object.values(seats).map((seat, index) => (
        <div key={seat.id} style={{ marginLeft: index !== 0 ? gapBetweenSeats : 0 }}>
          <Seat isVip={seat.isVip} place={index + 1} />
        </div>
      ))}
    </div>
  )
}
