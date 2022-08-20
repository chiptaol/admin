/* eslint-disable no-throw-literal */
import * as typed from 'typed-contracts'

type ErrorCodes =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 412
  | 422
  | 500
  | 501
  | 502
  | 503
  | 503
  | 505

export function parseByStatus<
  Variants extends string,
  Contracts extends Record<number, [Variants, typed.Contract<any>]>,
  Result extends {
    [Code in keyof Contracts]: Contracts[Code] extends [infer Status, typed.Contract<infer T>]
      ? { status: Status; answer: T }
      : never
  }
>(
  name: string,
  response: { status: number; body?: unknown },
  contractsObject: Contracts
): Result[Exclude<keyof Result, ErrorCodes>] {
  const contractObject = contractsObject[response.status]
  if (!contractObject) {
    throw {
      status: 'unknown_status',
      error: {
        status: response.status,
        body: response.body,
      },
    }
  }
  const [status, contract] = contractObject
  const answer = contract(name, response.body)
  if (answer instanceof typed.ValidationError) {
    const error = { status: 'validation_error', error: answer }
    // eslint-disable-next-line no-console
    console.error('VALIDATION_ERROR', error)
    throw error
  }

  if (response.status >= 400) {
    throw { status, error: answer }
  }
  return { status, answer } as Result[Exclude<keyof Result, ErrorCodes>]
}
