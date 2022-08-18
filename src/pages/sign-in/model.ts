import { chainRoute, redirect, RouteParamsAndQuery } from 'atomic-router'
import { attach, sample } from 'effector'
import { session } from '~entities/session'
import { request } from '~shared/api'
import { routes } from '~shared/routes'

const currentRoute = routes.signIn

const checkSessionFx = attach({
  effect: request.fetchMeRequestFx,
  mapParams: (_: RouteParamsAndQuery<any>) => {},
})

const sessionCheckedRoute = chainRoute({
  route: currentRoute,
  beforeOpen: checkSessionFx,
  openOn: [checkSessionFx.failData],
})

redirect({
  clock: checkSessionFx.done,
  route: routes.notFound,
})

currentRoute.opened.watch(() => 'sign in page opened')
