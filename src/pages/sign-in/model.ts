import { redirect, RouteParamsAndQuery } from 'atomic-router'
import { attach } from 'effector'

import { request } from '~shared/api'
import { routes } from '~shared/routes'

const currentRoute = routes.signIn

const checkSessionFx = attach({
  effect: request.fetchMeRequestFx,
  mapParams: (_: RouteParamsAndQuery<any>) => {},
})

redirect({
  clock: checkSessionFx.done,
  route: routes.notFound,
})
