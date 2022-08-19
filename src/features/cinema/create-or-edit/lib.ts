import * as yup from 'yup'
import { cinema } from '~entities/cinema'

import { createRule } from '~shared/lib/create-rule'
import { types } from '~shared/types'

type FormFields = {
  title: string
  phone: string
  address: string
  reference_point: string
  logo_id: string
  coords: null | number[]
}

export const formFields = {
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
  //TODO add validation to phone field
  phone: {
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
  address: {
    init: '',
    rules: [
      createRule({
        name: 'address',
        schema: yup
          .string()
          .transform((s) => s.trim())
          .required('Обязательное поле'),
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
          .required('Обязательное поле'),
      }),
    ],
  },
  logo: {
    init: null as null | string,
    rules: [
      createRule({
        name: 'logo',
        schema: yup.string().nullable().required('Обязательное поле'),
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
          .nullable()
          .of(yup.number().required('Обязательное поле'))
          .required('Обязательное поле'),
      }),
    ],
  },
}

export function normalizeRequestFormFields(fields: FormFields): types.CreateCinemaRequest {
  const { coords, ...rest } = fields

  const [latitude, longitude] = coords!

  return {
    ...rest,
    latitude,
    longitude,
  }
}

export function normalizeResponseFormFields(
  fields: types.Cinema
): Omit<FormFields, 'logo_id'> & { logo: string | null } {
  const { id: _, latitude, longitude, logo, reference_point, ...next } = fields

  return {
    ...next,
    coords: [+latitude, +longitude],
    logo: cinema.config.IMAGE_BASE_SRC + logo?.path,
    reference_point: reference_point ?? '-',
  }
}
