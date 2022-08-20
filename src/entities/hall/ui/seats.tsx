import { useList, useUnit } from 'effector-react'

import * as model from '../model'
import { Seat } from './seat'

export const HallSeats = () => {
  return (
    <div className="flex flex-col space-y-4 w-max h-max relative ml-10">
      <div className="flex">
        <Rows />
        <Container>
          <ZoomContainer>
            <Seats />
          </ZoomContainer>
        </Container>
        <Rows />
      </div>
      <Zoom />
    </div>
  )
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ width: 500 }} className="h-[400px] overflow-scroll flex-2 relative scrollbar">
      {children}
    </div>
  )
}

const Rows = () => {
  const rows = useList(
    model.$hallRows.map((rows) => Object.entries(rows)),
    ([rowOrder, rowY]) => (
      <p
        className="absolute h-9 w-9 text-gray-400 flex justify-center font-medium items-center text-sm z-20"
        style={{ left: 0, top: rowY }}
      >
        <span>{rowOrder}</span>
      </p>
    )
  )
  return (
    <div style={{ width: 70 }} className="h-[400px] relative">
      {rows}
    </div>
  )
}

const Seats = () => {
  const seats = useList(
    model.$hallSeats.map((seats) => Object.values(seats)),
    (seat) => <Seat seat={seat} />
  )

  return <>{seats}</>
}

const ZoomContainer = ({ children }: { children: React.ReactNode }) => {
  const scale = useUnit(model.$scale)

  return <div style={{ transformOrigin: '0 0', transform: `scale(${scale})` }}>{children}</div>
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
