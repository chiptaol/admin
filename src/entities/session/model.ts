import { chainRoute, RouteInstance, RouteParamsAndQuery } from 'atomic-router'
import { attach, createEffect, createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'
import { combineEvents } from 'patronum'

import { request } from '~shared/api'
import { router, routes } from '~shared/routes'
import { appStarted } from '~shared/system'
import { types } from '~shared/types'

export const cinemaSelected = createEvent<number>()

export const $session = createStore<types.User | null>(null)
export const $isAuthorized = $session.map(Boolean)
export const $selectedCinema = createStore<null | number>(null)

export const signInFx = attach({ effect: request.signInRequestFx })
export const signOutFx = attach({ effect: request.signOutRequestFx })
export const fetchMeFx = attach({ effect: request.fetchMeRequestFx })
export const checkSessionFx = createEffect(async (_: RouteParamsAndQuery<any>) => {
  const { status } = await fetchMeFx()

  return status
})

$session.on(fetchMeFx.doneData, (_, { answer }) => answer).reset(signOutFx.done)
$selectedCinema.on(cinemaSelected, (_, cId) => cId).reset(signOutFx.done)

export const authorizedRoute = <Params>(route: RouteInstance<Params>) => {
  const alreadyAuthorized = sample({
    clock: checkSessionFx.doneData,
    filter: (status) => status === 'ok',
  })

  const cinemaSelected = sample({
    clock: [appStarted, $selectedCinema, route.opened],
    source: $selectedCinema,
    filter: (cId) => cId !== null,
  })

  return chainRoute<Params>({
    route,
    beforeOpen: checkSessionFx,
    openOn: [combineEvents({ events: [alreadyAuthorized, cinemaSelected], reset: route.closed })],
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

sample({
  clock: signOutFx.done,
  fn: () => ({}),
  target: routes.signIn.open,
})

persist({
  store: $selectedCinema,
  key: 'cinemaId',
})

cinemaSelected.watch(() => {
  window.location.href = '/'
})
