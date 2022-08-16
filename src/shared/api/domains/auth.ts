import { createEffect } from 'effector'

import { parseByStatus } from '~shared/lib/parse-by-status'
import { contract, types } from '~shared/types'

import { authenticatedRequestFx, requestInternalFx } from '../init'

export const signInRequestFx = createEffect<
  types.SignInRequest,
  types.SignInRequestDone,
  types.SignInRequestFail
>({
  async handler(body) {
    const name = 'signInRequestFx.body'
    const response = await requestInternalFx({
      path: 'auth/sign-in',
      method: 'POST',
      body,
    })

    return parseByStatus(name, response, {
      204: ['ok', contract.signInRequestOk],
      401: ['wrong_password', contract.signInRequestWrongPassword],
      422: ['invalid_payload', contract.signInRequestInvalidPayload],
    })
  },
})

export const signOutRequestFx = createEffect<
  void,
  types.SignOutRequestDone,
  types.SignOutRequestFail
>({
  async handler() {
    const name = 'signOutRequestFx.body'
    const response = await authenticatedRequestFx({
      path: 'auth/sign-out',
      method: 'POST',
    })

    return parseByStatus(name, response, {
      204: ['ok', contract.signOutRequestOk],
      401: ['not_authorized', contract.signOutRequestNotAuthorized],
    })
  },
})
