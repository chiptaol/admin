import { createEffect } from 'effector'

import { parseByStatus } from '~shared/lib/parse-by-status'
import { contract, types } from '~shared/types'

import { authenticatedRequestFx } from '../init'

export const fetchCinemasRequestFx = createEffect<
  void,
  types.FetchCinemasRequestDone,
  types.FetchCinemasRequestFail
>({
  async handler() {
    const name = 'fetchCinemasRequestFx.body'
    const response = await authenticatedRequestFx({
      path: 'cinemas',
      method: 'GET',
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchCinemasRequestOk],
    })
  },
})

export const fetchCinemaRequestFx = createEffect<
  types.FetchCinemaRequest,
  types.FetchCinemaRequestDone,
  types.FetchCinemaRequestFail
>({
  async handler({ id }) {
    const name = 'fetchCinemaRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${id}`,
      method: 'GET',
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchCinemaRequestOk],
    })
  },
})

export const createCinemaRequestFx = createEffect<
  types.CreateCinemaRequest,
  types.CreateCinemaRequestDone,
  types.CreateCinemaRequestFail
>({
  async handler(body) {
    const name = 'createCinemaRequestFx.body'
    const response = await authenticatedRequestFx({
      path: 'cinemas',
      method: 'POST',
      body,
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.createCinemaRequestOk],
    })
  },
})

export const editCinemaRequestFx = createEffect<
  types.EditCinemaRequest,
  types.EditCinemaRequestDone,
  types.EditCinemaRequestFail
>({
  async handler({ id, ...body }) {
    const name = 'editCinemaRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${id}`,
      method: 'PUT',
      body,
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.editCinemaRequestOk],
    })
  },
})

export const uploadCinemaLogoRequestFx = createEffect<
  types.UploadCinemaLogoRequest,
  types.UploadCinemaLogoRequestDone,
  types.UploadCinemaLogoRequestFail
>({
  async handler(body) {
    const name = 'uploadCinemaLogoRequestFx.body'
    const response = await authenticatedRequestFx({
      path: 'cinemas/logo',
      method: 'POST',
      body,
    })

    return parseByStatus(name, response, {
      201: ['ok', contract.uploadCinemaLogoRequestOk],
    })
  },
})

export const deleteCinemaRequestFx = createEffect<
  types.DeleteCinemaRequest,
  types.DeleteCinemaRequestDone,
  types.DeleteCinemaRequestFail
>({
  async handler({ id }) {
    const name = 'deleteCinemaRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${id}`,
      method: 'DELETE',
    })

    return parseByStatus(name, response, {
      204: ['ok', contract.deleteCinemaRequestOk],
    })
  },
})
