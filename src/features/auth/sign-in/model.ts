import { sample, split } from 'effector'
import { createForm } from 'effector-forms'
import { condition } from 'patronum'
import * as yup from 'yup'
import { cinema } from '~entities/cinema'

import { session } from '~entities/session'
import { createRule } from '~shared/lib/create-rule'
import { redirectedByHistory, routes } from '~shared/routes'
import { types } from '~shared/types'

export const form = createForm({
  fields: {
    email: {
      init: null as null | string,
      rules: [
        createRule({
          name: 'email',
          schema: yup.string().nullable().email().required('Обязательное поле'),
        }),
      ],
    },
    password: {
      init: null as null | string,
      rules: [
        createRule({
          name: 'password',
          schema: yup
            .string()
            .nullable()
            .transform((s: null | string) => (s ? s.trim() : s))
            .required('Обязательное поле'),
        }),
      ],
    },
  },
})

export const $isLoading = session.model.signInFx.pending

sample({
  clock: form.formValidated,
  fn: (fields) => ({
    email: fields.email!,
    password: fields.password!,
  }),
  target: session.model.signInFx,
})

split({
  source: session.model.signInFx.failData,
  match: ({ status }) => status,
  cases: {
    wrong_password: form.fields.password.addError.prepend<types.SignInRequestFail>(() => ({
      rule: 'password',
      errorText: 'Неправильный пароль',
    })),
    __: form.fields.email.addError.prepend<types.SignInRequestFail>(() => ({
      rule: 'email',
      errorText: 'Произошла ошибка',
    })),
  },
})

condition({
  source: sample({
    clock: session.model.signInFx.done,
    source: routes.signIn.$query,
    fn: (query) => query?.redirectUri ?? null,
  }),
  if: (redirectUri: string | null) => Boolean(redirectUri),
  then: redirectedByHistory.prepend<string | null | void>((path) => path ?? '/'),
  else: routes.home.open.prepend(() => ({})),
})

sample({
  clock: routes.signIn.closed,
  target: form.reset,
})
