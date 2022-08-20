import { attach, createApi, createStore, sample, split } from 'effector'
import { createForm } from 'effector-forms'
import { pending } from 'patronum'
import * as yup from 'yup'

import { hall } from '~entities/hall'
import { session } from '~entities/session'
import { createRule } from '~shared/lib/create-rule'
import { createDisclosure } from '~shared/lib/disclosure'
import { showErrorToastFx, showSuccessToastFx } from '~shared/lib/toast'
import { routes } from '~shared/routes'
import { types } from '~shared/types'

type FormFields = {
  title: string
  description: string
  is_vip: boolean
}

type NormalizedFormFields = ReturnType<typeof normalizeRequestFormFields>

export const form = createForm({
  fields: {
    title: {
      init: '',
      rules: [
        createRule({
          name: 'title',
          schema: yup
            .string()
            .transform((s) => s.trim())
            .required('Обязательное поле'),
        }),
      ],
    },
    description: {
      init: '',
      rules: [
        createRule({
          name: 'description',
          schema: yup
            .string()
            .transform((s) => (s ? s.trim() : s))
            .not(['required']),
        }),
      ],
    },
    is_vip: {
      init: false,
      rules: [createRule({ name: 'is_vip', schema: yup.bool().not(['required']) })],
    },
  },
})

export const disclosure = createDisclosure()
const formValidated = form.formValidated.map(normalizeRequestFormFields)

export const $action = createStore<'create' | 'edit'>('create')

const createHallFx = attach({
  effect: hall.model.createHallFx,
  source: session.model.$selectedCinema,
  mapParams: (fields: NormalizedFormFields, cId) => {
    if (!cId) throw Error('Cinema id is not defined')

    return {
      ...fields,
      cId,
    }
  },
})
const editHallFx = attach({
  effect: hall.model.editHallFx,
  source: {
    cId: session.model.$selectedCinema,
    hId: routes.hall.current.$params.map((params) => params.hId),
  },
  mapParams: (fields: NormalizedFormFields, { cId, hId }) => {
    if (!cId) throw Error('Cinema id is not defined')

    return {
      ...fields,
      cId,
      hId,
    }
  },
})

export const $isLoading = pending({ effects: [createHallFx, editHallFx] })

export const { createButtonClicked, editButtonClicked } = createApi($action, {
  createButtonClicked: () => 'create',
  editButtonClicked: () => 'edit',
})

sample({
  clock: [createButtonClicked, editButtonClicked],
  target: disclosure.open,
})

sample({
  clock: disclosure.close,
  target: form.reset,
})

sample({
  clock: editButtonClicked,
  source: { params: routes.hall.current.$params, halls: hall.model.$halls },
  filter: ({ halls, params }) => !!halls[params.hId],
  fn: ({ halls, params }) => normalizeResponseFormFields(halls[params.hId]),
  target: form.setForm,
})

split({
  source: sample({
    clock: formValidated,
    filter: form.$touched,
  }),
  match: $action,
  cases: {
    create: createHallFx,
    edit: editHallFx,
  },
})

sample({
  clock: [createHallFx.done, editHallFx.done],
  target: [disclosure.close, showSuccessToastFx.prepend(() => ({ title: 'Сохранено' }))],
})

sample({
  clock: [createHallFx.fail, editHallFx.fail],
  target: showErrorToastFx.prepend(() => ({ title: 'Произошла ошибка' })),
})

function normalizeResponseFormFields(hall: types.Hall) {
  return {
    title: hall.title,
    is_vip: hall.is_vip,
    description: hall.description ?? '',
  }
}

function normalizeRequestFormFields(fields: FormFields) {
  return {
    ...fields,
    description: fields.description || null,
  }
}
