import { createEffect } from 'effector'

import { parseByStatus } from '~shared/lib/parse-by-status'
import { contract, types } from '~shared/types'

import { authenticatedRequestFx } from '../init'

export const fetchMeRequestFx = createEffect<
  void,
  types.FetchMeRequestDone,
  types.FetchMeRequestFail
>({
  async handler() {
    const name = 'fetchMeRequestFx.body'
    const response = await authenticatedRequestFx({
      path: 'me',
      method: 'GET',
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchMeRequestOk],
    })
  },
})

export const setCookieRequestFx = createEffect({
  async handler() {
    const response = await authenticatedRequestFx({
      path: 'set',
      method: 'GET',
    })

    console.log(response)
  },
})
