import { useStore } from 'effector-react'
import { useState } from 'react'
import { CinemaHallScreen, Seat } from '~entities/cinema'

import * as model from '../model'
import { Settings } from './settings'

export const CreateHall = () => {
  const [scale, setScale] = useState(1)
  return (
    <div className="w-full flex justify-center items-center">
      {/* <Container>
        <CinemaHallScreen />
        <div style={{ transformOrigin: '0 0', transform: `scale(${scale})` }}></div>
      </Container>
      <div className="flex flex-col space-y-1">
        <button onClick={() => setScale((prev) => prev + 0.1)}>zoom in</button>
        <button onClick={() => setScale((prev) => prev - 0.1)}>zoom out</button>
      </div> */}
      <Settings />
    </div>
  )
}

const Container = ({ children }: { children: React.ReactNode }) => {
  const width = useStore(model.$hallWidth)

  return (
    <div style={{ width }} className="h-[600px] overflow-auto">
      {children}
    </div>
  )
}
