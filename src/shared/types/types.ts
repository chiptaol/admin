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
