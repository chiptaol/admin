import { types } from '~shared/types'

export type FormFields = {
  movie_format: null | number
  start_date: string
  start_date_time: string
  hall_id: null | number
  standard_seat_price: number | null
  vip_seat_price: number | null
  hallConfig: {
    seats: ('standart' | 'vip')[]
    formats: types.Format[]
  }
}

export const formDefaultFields: FormFields = {
  hall_id: null,
  movie_format: null,
  start_date: '',
  standard_seat_price: null,
  start_date_time: '',
  vip_seat_price: null,
  hallConfig: {
    formats: [],
    seats: [],
  },
}

export function normalizeRequestBody(
  formFields: Record<string, FormFields>
): types.CreateSeancesRequest['seances'] {
  return Object.values(formFields).map((field) => ({
    hall_id: field.hall_id!,
    movie_format_id: field.movie_format!,
    start_date_time: `${field.start_date} ${field.start_date_time}`,
    standard_seat_price: field.standard_seat_price! * 100,
    vip_seat_price: field.vip_seat_price! * 100,
  }))
}
