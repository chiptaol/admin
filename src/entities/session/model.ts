import { chainRoute, RouteInstance, RouteParamsAndQuery } from 'atomic-router'
import { attach, createEffect, createStore, sample } from 'effector'

import { request } from '~shared/api'
import { router, routes } from '~shared/routes'
import { types } from '~shared/types'

export const $session = createStore<types.User | null>(null)
export const $isAuthorized = $session.map(Boolean)

export const signInFx = attach({ effect: request.signInRequestFx })
export const signOutFx = attach({ effect: request.signOutRequestFx })
export const fetchMeFx = attach({ effect: request.fetchMeRequestFx })
export const checkSessionFx = createEffect(async (_: RouteParamsAndQuery<any>) => {
  const { status } = await fetchMeFx()

  return status
})

$session.on(fetchMeFx.doneData, (_, { answer }) => answer).reset(signOutFx.done)

export const authorizedRoute = <Params>(route: RouteInstance<Params>) => {
  const alreadyAuthorized = sample({
    clock: checkSessionFx.doneData,
    filter: (status) => status === 'ok',
  })

  return chainRoute({
    route,
    beforeOpen: checkSessionFx,
    openOn: [alreadyAuthorized],
  })
}

sample({
  clock: checkSessionFx.failData,
  source: router.$path,
  target: routes.signIn.navigate.prepend<string>((path) => ({
    query: { redirectUri: path },
    params: {},
  })),
})
