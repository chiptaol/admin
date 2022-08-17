import { attach, createEffect } from 'effector'

const BASE_URL = import.meta.env.VITE_APP_SERVER_ENDPOINT

type Request = {
  path: string
  method: string
  headers?: Record<string, any>
  body?: Record<string, any>
}

type Answer<T = unknown> = {
  status: number
  ok: boolean
  body: T
}

export type ResponseResult<Data> = string | Record<string, Data> | null

async function request({ path, method, ...params }: Request) {
  const body = params.body ? JSON.stringify(params.body) : undefined
  const headers = params.headers
    ? { ...getDefaultHeaders(), ...params.headers }
    : getDefaultHeaders()

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    body,
    headers,
  })

  const answer = await getResponseAnswer(response)
  const responder = {
    ok: response.ok,
    status: response.status,
    body: answer,
  }

  return responder
}

export const requestInternalFx = createEffect<Request, Answer, Answer>(request)

export const authenticatedRequestFx = attach({ effect: requestInternalFx })

function getDefaultHeaders() {
  return {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'credentials': 'include',
  }
}

async function getResponseAnswer<Data>(response: Response): Promise<ResponseResult<Data>> {
  if (contentIs(response.headers, 'application/json')) {
    return response.json()
  }
  const hasEmptyResponse = !response.headers.get('content-type')
  if (hasEmptyResponse) {
    return null
  }
  return response.text()
}

function contentIs(headers: Headers, type: string): boolean {
  return headers.get('content-type')?.includes(type) ?? false
}
