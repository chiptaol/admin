import { createHistoryRouter, createRoute } from 'atomic-router'
import { attach, createEvent, sample } from 'effector'
import { createBrowserHistory } from 'history'

export const routes = {
  home: createRoute(),
  signIn: createRoute<{ redirectUri?: string }>(),
  notFound: createRoute(),
}

export const redirectedByHistory = createEvent<string>()

export const routesMap = [
  {
    path: '/',
    route: routes.home,
  },
  {
    path: '/sign-in',
    route: routes.signIn,
  },
  {
    path: '/404',
    route: routes.notFound,
  },
]

export const router = createHistoryRouter({
  routes: routesMap,
  notFoundRoute: routes.notFound,
})

export const history = createBrowserHistory()
router.setHistory(history)

const redirectFx = attach({
  source: router.$history,
  effect: (history, url: string) => {
    history.replace(url)
  },
})

sample({
  clock: redirectedByHistory,
  target: redirectFx,
})

sample({
  clock: router.routeNotFound,
  fn: () => ({}),
  target: routes.notFound.open,
})
