import { createDomain, createEvent, createStore, restore, sample } from 'effector'
import { createForm } from 'effector-forms'
import * as yup from 'yup'

import { createRule } from '~shared/lib/create-rule'
import { routes } from '~shared/routes'

const domain = createDomain()

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
            .required('required_field'),
        }),
      ],
    },
    //TODO add validation to phone field
    phone: {
      init: '',
      rules: [
        createRule({
          name: 'title',
          schema: yup
            .string()
            .transform((s) => s.trim())
            .required('required_field'),
        }),
      ],
    },
    address: {
      init: '',
      rules: [
        createRule({
          name: 'address',
          schema: yup
            .string()
            .transform((s) => s.trim())
            .required('required_field'),
        }),
      ],
    },
    reference_point: {
      init: '',
      rules: [
        createRule({
          name: 'reference_point',
          schema: yup
            .string()
            .transform((s) => s.trim())
            .not(['required']),
        }),
      ],
    },
    logo_id: {
      init: null as null | string,
      rules: [
        createRule({
          name: 'logo_id',
          schema: yup
            .string()
            .nullable()
            .transform((s) => s.trim())
            .required('required_field'),
        }),
      ],
    },
    coords: {
      init: null as null | number[],
      rules: [
        createRule({
          name: 'coords',
          schema: yup
            .array()
            .of(yup.number().required('required_field'))
            .required('required_field'),
        }),
      ],
    },
  },
})

export const createButtonClicked = createEvent()
export const deleteImageButtonClicked = createEvent()
export const imageUploaded = createEvent<File>()

const $imageFile = domain.createStore<null | File>(null)
export const $imagePath = domain.createStore<string | null>(null)

domain.onCreateStore((store) => store.reset(routes.cinema.create.closed))
$imageFile.on(imageUploaded, (_, file) => file).reset(deleteImageButtonClicked)
$imagePath.on(imageUploaded, (_, file) => URL.createObjectURL(file)).reset(deleteImageButtonClicked)

sample({
  clock: createButtonClicked,
  filter: routes.cinema.create.$isOpened.map((is) => !is),
  target: routes.cinema.create.open.prepend(() => ({})),
})
