import { redirect } from 'atomic-router'
import { attach, createDomain, createEvent, sample } from 'effector'
import { createForm } from 'effector-forms'
import { pending } from 'patronum'

import { cinema } from '~entities/cinema'
import { session } from '~entities/session'
import { request } from '~shared/api'
import { showErrorToastFx, showSuccessToastFx } from '~shared/lib/toast'
import { routes } from '~shared/routes'
import { types } from '~shared/types'

import * as lib from './lib'

const domain = createDomain()

export const form = createForm({ fields: lib.formFields })

export const createButtonClicked = createEvent()
export const deleteImageButtonClicked = createEvent()
export const imageUploaded = createEvent<File>()
export const cancelButtonClicked = createEvent()
export const setFormValues = createEvent<types.Cinema>()

const $imageFile = domain.createStore<null | File>(null)

const uploadLogoFx = attach({
  source: $imageFile,
  effect: async (file, meta: 'edit' | 'create') => {
    if (!file) {
      return {
        meta,
        id: null,
      }
    }

    const formData = new FormData()
    formData.append('file', file)

    const { answer } = await request.uploadCinemaLogoRequestFx(formData)

    return { id: answer.id, meta }
  },
})
const createCinemaFx = attach({ effect: cinema.model.createCinemaFx })
const editCinemaFx = attach({
  effect: cinema.model.editCinemaFx,
  source: session.model.$selectedCinema,
  mapParams: (params: Omit<types.EditCinemaRequest, 'id'>, id) => {
    if (!id) throw Error('Cinema id is not defined')

    return {
      ...params,
      id,
    }
  },
})

export const $isLoading = pending({ effects: [createCinemaFx, uploadLogoFx] })

domain.onCreateStore((store) =>
  store.reset([routes.cinema.create.closed, routes.cinema.edit.closed])
)
$imageFile.on(imageUploaded, (_, file) => file).reset(deleteImageButtonClicked)

sample({
  clock: createButtonClicked,
  filter: routes.cinema.create.$isOpened.map((is) => !is),
  target: routes.cinema.create.open.prepend(() => ({})),
})

sample({
  clock: imageUploaded,
  fn: (file) => URL.createObjectURL(file),
  target: form.fields.logo.onChange,
})

sample({
  clock: deleteImageButtonClicked,
  target: form.fields.logo.reset,
})

sample({
  clock: form.formValidated,
  filter: routes.cinema.create.$isOpened,
  fn: () => 'create' as const,
  target: uploadLogoFx,
})

sample({
  clock: form.formValidated,
  source: { isEditRoute: routes.cinema.edit.$isOpened, isTouched: form.$touched },
  filter: ({ isEditRoute, isTouched }) => isEditRoute && isTouched,
  fn: () => 'edit' as const,
  target: uploadLogoFx,
})

sample({
  clock: uploadLogoFx.doneData.filter({ fn: ({ meta }) => meta === 'create' }),
  source: form.formValidated,
  fn: ({ logo: _, ...fields }, { id }) =>
    lib.normalizeRequestFormFields({ ...fields, logo_id: id! }),
  target: createCinemaFx,
})

sample({
  clock: uploadLogoFx.doneData.filter({ fn: ({ meta, id }) => meta === 'edit' && !!id }),
  source: form.formValidated,
  fn: ({ logo: _, ...fields }, { id }) =>
    lib.normalizeRequestFormFields({ ...fields, logo_id: id! }),
  target: editCinemaFx,
})

sample({
  clock: sample({
    clock: uploadLogoFx.doneData.filter({ fn: ({ meta, id }) => meta === 'edit' && !id }),
    source: form.formValidated,
    fn: ({ logo: _, ...fields }, { id }) => fields,
  }),
  source: cinema.model.$cinema,
  filter: Boolean,
  fn: (cinema, fields) => lib.normalizeRequestFormFields({ ...fields, logo_id: cinema.logo?.id! }),
  target: editCinemaFx,
})

sample({
  clock: [routes.cinema.create.closed, routes.cinema.edit.closed],
  target: form.reset,
})

redirect({
  clock: [cancelButtonClicked, createCinemaFx.doneData, editCinemaFx.doneData],
  route: routes.home,
})

sample({
  clock: [createCinemaFx.doneData, editCinemaFx.doneData],
  fn: ({ answer }) => answer.data.id,
  target: [
    showSuccessToastFx.prepend(() => ({ title: 'Сохранено' })),
    session.model.$selectedCinema,
  ],
})

sample({
  clock: [createCinemaFx.failData, editCinemaFx.failData],
  target: showErrorToastFx.prepend(() => ({ title: 'Произошла ошибка' })),
})

sample({
  clock: setFormValues,
  fn: lib.normalizeResponseFormFields,
  target: form.setForm,
})
