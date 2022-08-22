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

export const fetchCinemasRequestOk = typed.obj({
  data: typed.arr(entity.cinema),
})

export const fetchCinemaRequestOk = typed.obj({
  data: entity.cinema,
})

export const createCinemaRequestOk = typed.obj({
  data: entity.cinema,
})

export const editCinemaRequestOk = typed.obj({
  data: entity.cinema,
})

export const uploadCinemaLogoRequestOk = typed.obj({
  id: typed.string,
})

export const deleteCinemaRequestOk = typed.nul

export const fetchHallsRequestOk = typed.obj({
  data: typed.arr(entity.hall),
})

export const fetchHallRequestOk = typed.obj({
  data: entity.hall,
})

export const createHallRequestOk = typed.obj({
  data: entity.hall,
})

export const editHallRequestOk = typed.obj({
  data: entity.hall,
})

export const deleteHallRequestOk = typed.nul

export const fetchHallSeatsRequestOk = typed.obj({
  data: typed.arr(entity.seat),
})

export const createHallSeatsRequestOk = typed.nul

export const fetchMoviesRequestOk = typed.arr(
  typed.obj({ id: typed.num, release_date: typed.str, title: typed.str })
)

export const createSeancesRequestOk = typed.nul

export const fetchSeancesRequestOk = typed.obj({
  data: typed.arr(entity.seance),
})

export const deleteSeanceRequestOk = typed.nul
