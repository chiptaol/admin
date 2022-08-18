import { sample } from 'effector'

import { Pages } from '~pages'
import { cinema } from '~entities/cinema'
import { appStarted } from '~shared/system'

import { withProviders } from './providers'

import './main.css'
import { attach } from 'effector'
import { session } from '~entities/session'

const fetchCinemasFx = attach({ effect: cinema.model.fetchCinemasFx })

sample({
  clock: appStarted,
  target: [fetchCinemasFx],
})

sample({
  clock: fetchCinemasFx.doneData.map(({ answer }) => answer.data[0]),
  source: session.model.$selectedCinema,
  filter: (selectedCinema, responseCinema) => selectedCinema === null && !!responseCinema,
  fn: (_, cinema) => cinema.id,
  target: session.model.$selectedCinema,
})

const App = () => {
  return <Pages />
}

export default withProviders(App)
