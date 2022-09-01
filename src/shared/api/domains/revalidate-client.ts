import { createEffect } from 'effector'

import { authenticatedRequestFx, getResponseAnswer } from '../init'

export const revalidateClientRequestFx = createEffect({
  async handler() {
    const name = 'revalidateClientRequestFx.body'
    const response = await fetch(
      import.meta.env.VITE_APP_CLIENT_URL +
        `api/revalidate?secret=${import.meta.env.VITE_APP_CLIENT_REVALIDATION_SECRET}`,
      { mode: 'no-cors' }
    )
    const answer = await getResponseAnswer(response)
    const responder = {
      ok: response.ok,
      status: response.status,
      body: answer,
    }

    console.log(responder)
  },
})
