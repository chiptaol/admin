import { sample } from 'effector'
import { session } from '~entities/session'
import { routes } from '~shared/routes'

const currentRoute = routes.home

currentRoute.opened.watch(() => console.log('home route opened'))

sample({
  clock: currentRoute.opened,
  target: session.fetchMeFx,
})
