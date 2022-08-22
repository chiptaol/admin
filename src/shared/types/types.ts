import * as typed from 'typed-contracts'

import { contract } from './contract'

export type GenericErrors =
  | {
      status: 'unexpected'
      error: Error
    }
  | {
      status: 'unknown_status'
      error: { status: number; body: unknown }
    }
  | {
      status: 'validation_error'
      error: typed.ValidationError
    }

export type SignInRequest = {
  email: string
  password: string
}
export type SignInRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.signInRequestOk>
}
export type SignInRequestWrongPassword = {
  status: 'wrong_password'
  error: typed.Get<typeof contract.signInRequestWrongPassword>
}
export type SignInRequestInvalidPayload = {
  status: 'invalid_payload'
  error: typed.Get<typeof contract.signInRequestInvalidPayload>
}
export type SignInRequestFail =
  | SignInRequestWrongPassword
  | SignInRequestInvalidPayload
  | GenericErrors

export type SignOutRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.signOutRequestOk>
}
export type SignOutRequestNotAuthorized = {
  status: 'not_authorized'
  error: typed.Get<typeof contract.signOutRequestNotAuthorized>
}
export type SignOutRequestFail = SignOutRequestNotAuthorized | GenericErrors

export type FetchMeRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchMeRequestOk>
}
export type FetchMeRequestFail = GenericErrors

export type User = typed.Get<typeof contract.user>

export type Cinema = typed.Get<typeof contract.cinema>

export type FetchCinemasRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchCinemasRequestOk>
}
export type FetchCinemasRequestFail = GenericErrors

export type FetchCinemaRequest = {
  id: number
}
export type FetchCinemaRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchCinemaRequestOk>
}
export type FetchCinemaRequestFail = GenericErrors

export type CreateCinemaRequest = {
  title: string
  address: string
  logo_id: string
  reference_point: string
  longitude: number
  latitude: number
  phone: string
}
export type CreateCinemaRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.createCinemaRequestOk>
}
export type CreateCinemaRequestFail = GenericErrors

export type UploadCinemaLogoRequest = FormData
export type UploadCinemaLogoRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.uploadCinemaLogoRequestOk>
}
export type UploadCinemaLogoRequestFail = GenericErrors

export type EditCinemaRequest = {
  title: string
  address: string
  logo_id: string
  reference_point: string
  longitude: number
  latitude: number
  phone: string
  id: number
}
export type EditCinemaRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.editCinemaRequestOk>
}
export type EditCinemaRequestFail = GenericErrors

export type DeleteCinemaRequest = {
  id: number
}
export type DeleteCinemaRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.deleteCinemaRequestOk>
}
export type DeleteCinemaRequestFail = GenericErrors

export type FetchHallsRequest = {
  cId: number
}
export type FetchHallsRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchHallsRequestOk>
}
export type FetchHallsRequestFail = GenericErrors

export type FetchHallRequest = {
  cId: number
  hId: number
}
export type FetchHallRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchHallRequestOk>
}
export type FetchHallRequestFail = GenericErrors

export type Hall = typed.Get<typeof contract.hall>

export type CreateHallRequest = {
  cId: number
  title: string
  description: null | string
  is_vip: boolean
}
export type CreateHallRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.createHallRequestOk>
}
export type CreateHallRequestFail = GenericErrors

export type EditHallRequest = {
  cId: number
  hId: number
  title: string
  description: null | string
  is_vip: boolean
}
export type EditHallRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.editHallRequestOk>
}
export type EditHallRequestFail = GenericErrors

export type DeleteHallRequest = {
  cId: number
  hId: number
}
export type DeleteHallRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.deleteHallRequestOk>
}
export type DeleteHallRequestFail = GenericErrors

export type FetchHallSeatsRequest = {
  cId: number
  hId: number
}
export type FetchHallSeatsRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchHallSeatsRequestOk>
}
export type FetchHallSeatsRequestFail = GenericErrors

export type Seat = typed.Get<typeof contract.seat>

export type CreateHallSeatsRequest = {
  cId: number
  hId: number
  seats: Array<{
    is_vip: boolean
    row: number
    place: number
    x: number
    y: number
  }>
}
export type CreateHallSeatsRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.createHallSeatsRequestOk>
}
export type CreateHallSeatsRequestFail = GenericErrors

export type SearchMovie = typed.Get<typeof contract.fetchMoviesRequestOk>[number]

export type FetchMoviesRequest = {
  title: string
}
export type FetchMoviesRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchMoviesRequestOk>
}
export type FetchMoviesRequestFail = GenericErrors

export type Format = typed.Get<typeof contract.format>

export type CreateSeancesRequest = {
  cId: number
  seances: Array<{
    movie_format_id: number
    start_date_time: string
    hall_id: number
    standard_seat_price: number
    vip_seat_price: number
  }>
}
export type CreateSeancesRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.createSeancesRequestOk>
}
export type CreateSeancesRequestFail = GenericErrors

export type Seance = typed.Get<typeof contract.seance>

export type FetchSeancesRequest = {
  cId: number
}
export type FetchSeancesRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchSeancesRequestOk>
}

export type FetchSeancesRequestFail = GenericErrors

export type DeleteSeanceRequest = {
  cId: number
  sId: number
}
export type DeleteSeanceRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.deleteSeanceRequestOk>
}
export type DeleteSeanceRequestFail = GenericErrors
