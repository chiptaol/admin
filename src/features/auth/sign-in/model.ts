import { sample, split } from 'effector'
import { createForm } from 'effector-forms'
import * as yup from 'yup'

import { session } from '~entities/session'
import { createRule } from '~shared/lib/create-rule'
import { routes } from '~shared/routes'
import { types } from '~shared/types'

export const form = createForm({
  fields: {
    email: {
      init: null as null | string,
      rules: [
        createRule({
          name: 'email',
          schema: yup.string().nullable().email().required('required_field'),
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
            .required('required_field'),
        }),
      ],
    },
  },
})

sample({
  clock: form.formValidated,
  fn: (fields) => ({
    email: fields.email!,
    password: fields.password!,
  }),
  target: session.signInFx,
})

split({
  source: session.signInFx.failData,
  match: ({ status }) => status,
  cases: {
    wrong_password: form.fields.password.addError.prepend<types.SignInRequestFail>(() => ({
      rule: 'password',
      errorText: 'wrong_password',
    })),
    __: form.fields.email.addError.prepend<types.SignInRequestFail>(() => ({
      rule: 'email',
      errorText: 'smth_went_wrong',
    })),
  },
})

sample({
  clock: session.signInFx.done,
  target: routes.home.open,
})
