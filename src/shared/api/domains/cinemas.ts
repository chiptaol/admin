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

export const fetchHallsRequestFx = createEffect<
  types.FetchHallsRequest,
  types.FetchHallsRequestDone,
  types.FetchHallsRequestFail
>({
  async handler({ cId }) {
    const name = 'fetchHallsRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${cId}/halls`,
      method: 'GET',
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchHallsRequestOk],
    })
  },
})

export const fetchHallRequestFx = createEffect<
  types.FetchHallRequest,
  types.FetchHallRequestDone,
  types.FetchHallRequestFail
>({
  async handler({ cId, hId }) {
    const name = 'fetchHallRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${cId}/halls/${hId}`,
      method: 'GET',
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchHallRequestOk],
    })
  },
})

export const createHallRequestFx = createEffect<
  types.CreateHallRequest,
  types.CreateHallRequestDone,
  types.CreateHallRequestFail
>({
  async handler({ cId, ...body }) {
    const name = 'createHallRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${cId}/halls`,
      method: 'POST',
      body,
    })

    return parseByStatus(name, response, {
      201: ['ok', contract.createHallRequestOk],
    })
  },
})

export const editHallRequestFx = createEffect<
  types.EditHallRequest,
  types.EditHallRequestDone,
  types.EditHallRequestFail
>({
  async handler({ cId, hId, ...body }) {
    const name = 'editHallRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${cId}/halls/${hId}`,
      method: 'PUT',
      body,
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.editHallRequestOk],
    })
  },
})

export const deleteHallRequestFx = createEffect<
  types.DeleteHallRequest,
  types.DeleteHallRequestDone,
  types.DeleteHallRequestFail
>({
  async handler({ cId, hId }) {
    const name = 'deleteHallRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${cId}/halls/${hId}`,
      method: 'DELETE',
    })

    return parseByStatus(name, response, {
      204: ['ok', contract.deleteHallRequestOk],
    })
  },
})

export const fetchHallSeatsRequestFx = createEffect<
  types.FetchHallSeatsRequest,
  types.FetchHallSeatsRequestDone,
  types.FetchHallSeatsRequestFail
>({
  async handler({ cId, hId }) {
    const name = 'fetchHallSeatsRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${cId}/halls/${hId}/seats`,
      method: 'GET',
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchHallSeatsRequestOk],
    })
  },
})

export const createHallSeatsRequestFx = createEffect<
  types.CreateHallSeatsRequest,
  types.CreateHallSeatsRequestDone,
  types.CreateHallSeatsRequestFail
>({
  async handler({ cId, hId, ...body }) {
    const name = 'createHallSeatsRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${cId}/halls/${hId}/seats`,
      method: 'POST',
      body,
    })

    return parseByStatus(name, response, {
      204: ['ok', contract.createHallSeatsRequestOk],
    })
  },
})

export const createSeancesRequestFx = createEffect<
  types.CreateSeancesRequest,
  types.CreateSeancesRequestDone,
  types.CreateSeancesRequestFail
>({
  async handler({ cId, ...body }) {
    const name = 'createSeancesRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${cId}/seances`,
      method: 'POST',
      body,
    })

    return parseByStatus(name, response, {
      204: ['ok', contract.createSeancesRequestOk],
    })
  },
})

export const fetchSeancesRequestFx = createEffect<
  types.FetchSeancesRequest,
  types.FetchSeancesRequestDone,
  types.FetchSeancesRequestFail
>({
  async handler({ cId }) {
    const name = 'fetchSeancesRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${cId}/seances`,
      method: 'GET',
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchSeancesRequestOk],
    })
  },
})

export const deleteSeanceRequestFx = createEffect<
  types.DeleteSeanceRequest,
  types.DeleteSeanceRequestDone,
  types.DeleteSeanceRequestFail
>({
  async handler({ cId, sId }) {
    const name = 'deleteSeanceRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${cId}/seances/${sId}`,
      method: 'DELETE',
    })

    return parseByStatus(name, response, {
      204: ['ok', contract.deleteSeanceRequestOk],
    })
  },
})
