import { attach, createEffect, sample } from 'effector'
import { delay } from 'patronum'

import { Pages } from '~pages'
import { cinema } from '~entities/cinema'
import { session } from '~entities/session'
import { appStarted } from '~shared/system'

import { withProviders } from './providers'

import './main.css'

const fetchCinemasFx = attach({ effect: cinema.model.fetchCinemasFx })

sample({
  clock: appStarted,
  target: [fetchCinemasFx],
})

sample({
  clock: session.model.signInFx.done,
  filter: session.model.$selectedCinema.map((is) => !is),
  target: fetchCinemasFx,
})

sample({
  clock: fetchCinemasFx.doneData.map(({ answer }) => answer.data[0]),
  source: session.model.$selectedCinema,
  filter: (selectedCinema, responseCinema) => selectedCinema === null && !!responseCinema,
  fn: (_, cinema) => cinema.id,
  target: session.model.$selectedCinema,
})

const hideSplashFx = createEffect(() => {
  document.querySelector('#splash-screen')?.classList.add('splash-hide')
})

delay({
  source: appStarted,
  timeout: 1000,
  target: hideSplashFx,
})

const App = () => {
  return <Pages />
}

export default withProviders(App)
