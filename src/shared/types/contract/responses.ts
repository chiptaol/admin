import * as typed from 'typed-contracts'

import * as entity from './entities'

export const signInRequestOk = typed.nul
export const signInRequestWrongPassword = typed.obj({
  message: typed.str,
})
export const signInRequestInvalidPayload = typed.obj({
  message: typed.str,
})

export const signOutRequestOk = typed.nul
export const signOutRequestNotAuthorized = typed.obj({
  message: typed.str,
})

export const fetchMeRequestOk = entity.user
