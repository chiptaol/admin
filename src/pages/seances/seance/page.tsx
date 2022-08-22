import { useUnit } from 'effector-react'

import { SeanceCard } from '~entities/seance'
import { DeleteSeance } from '~features/seance'
import { routes } from '~shared/routes'

export const SeancePage = () => {
  const { sId } = useUnit(routes.seance.$params)
  return (
    <div className="w-full h-full p-5 flex flex-col space-y-5">
      <SeanceCard id={sId} />
      <DeleteSeance />
    </div>
  )
}
