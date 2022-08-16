import { attach, createStore, restore } from 'effector'

import { request } from '~shared/api'
import { types } from '~shared/types'

export const $session = createStore<types.User | null>(null)

export const signInFx = attach({ effect: request.signInRequestFx })
export const signOutFx = attach({ effect: request.signOutRequestFx })
export const fetchMeFx = attach({ effect: request.fetchMeRequestFx })

$session.on(fetchMeFx.doneData, (_, { answer }) => answer).reset(signOutFx.done)
