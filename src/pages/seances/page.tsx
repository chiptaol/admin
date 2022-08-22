import { Link, Route } from 'atomic-router-react'
import { useList } from 'effector-react'
import { BsPlusLg } from 'react-icons/bs'
import { seance, SeanceListItem } from '~entities/seance'

import { routes } from '~shared/routes'
import { IconButton } from '~shared/ui'

import { SeancePage } from './seance'

export const SeancesPage = () => {
  const seances = useList(seance.model.$seances, (seance) => (
    <Link to={routes.seance} params={{ sId: seance.id }} key={seance.id}>
      <SeanceListItem seance={seance} />
    </Link>
  ))
  return (
    <div className="w-full h-full flex">
      <div className="max-w-sm w-full shadow-lg h-full px-3 py-4">
        <div className="flex items-center w-full justify-between mb-4">
          <h1 className="text-xl font-semibold">Сеансы</h1>
          <Link to={routes.createSeance}>
            <IconButton
              aria-label="create-seance"
              className="!p-2 hover:bg-blue-50 transition-colors"
            >
              <BsPlusLg />
            </IconButton>
          </Link>
        </div>
        <div className="flex flex-col space-y-1">{seances}</div>
      </div>
      <Route route={routes.seance} view={SeancePage} />
    </div>
  )
}
