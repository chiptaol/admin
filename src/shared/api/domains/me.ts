import { createEffect } from 'effector'

import { parseByStatus } from '~shared/lib/parse-by-status'
import { contract } from '~shared/types'

import { authenticatedRequestFx } from '../init'

export const fetchMeRequestFx = createEffect({
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
