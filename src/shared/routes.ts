import { createHistoryRouter, createRoute } from 'atomic-router'
import { attach, createEvent, sample } from 'effector'
import { createBrowserHistory } from 'history'

export const routes = {
  home: createRoute(),
  cinema: {
    create: createRoute(),
    edit: createRoute(),
  },
  halls: createRoute(),
  hall: {
    current: createRoute<{ hId: number }>(),
    seats: createRoute<{ hId: number }>(),
  },
  signIn: createRoute<{ redirectUri?: string }>(),
  seances: createRoute(),
  seance: createRoute<{ sId: number }>(),
  createSeance: createRoute(),
  notFound: createRoute(),
}

export const redirectedByHistory = createEvent<string>()

export const routesMap = [
  {
    path: '/',
    route: routes.home,
  },
  {
    path: '/cinema/create',
    route: routes.cinema.create,
  },
  {
    path: '/cinema/edit',
    route: routes.cinema.edit,
  },
  {
    path: '/halls',
    route: routes.halls,
  },
  {
    path: '/halls/:hId*',
    route: routes.halls,
  },
  {
    path: '/halls/:hId',
    route: routes.hall.current,
  },
  {
    path: '/seats/:hId',
    route: routes.hall.seats,
  },
  {
    path: '/seances',
    route: routes.seances,
  },
  {
    path: '/seances/:sId*',
    route: routes.seances,
  },
  {
    path: '/seances/:sId',
    route: routes.seance,
  },
  {
    path: '/seance/create',
    route: routes.createSeance,
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
