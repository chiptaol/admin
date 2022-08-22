import { createEffect } from 'effector'

import { parseByStatus } from '~shared/lib/parse-by-status'
import { contract, types } from '~shared/types'

import { authenticatedRequestFx } from '../init'

export const fetchMoviesRequestFx = createEffect<
  types.FetchMoviesRequest,
  types.FetchMoviesRequestDone,
  types.FetchMoviesRequestFail
>({
  async handler({ title }) {
    const name = 'fetchMoviesRequestFx.body'
    const path = `movies/search/${title}`

    console.log(path)
    const response = await authenticatedRequestFx({
      path,
      method: 'GET',
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchMoviesRequestOk],
    })
  },
})
