import { attach, createDomain, createEvent, createStore, restore, sample } from 'effector'
import { debounce } from 'patronum'
import { seance } from '~entities/seance'
import { session } from '~entities/session'
import { form } from '~features/auth/sign-in/model'
import { request } from '~shared/api'
import { createOid } from '~shared/lib/create-oid'
import { createDisclosure } from '~shared/lib/disclosure'
import { normalizr } from '~shared/lib/normalizr'
import { showErrorToastFx, showSuccessToastFx } from '~shared/lib/toast'
import { routes } from '~shared/routes'
import { types } from '~shared/types'

import * as lib from './lib'

export const disclosure = createDisclosure()
const domain = createDomain()

export const searchChanged = createEvent<string>()
export const movieSelected = createEvent<number>()
export const hallSelected = createEvent<{ fieldId: string; hId: number }>()
export const formatSelected = createEvent<{ fieldId: string; fId: number }>()
export const seanceFieldAdded = createEvent()
export const dateSelected = createEvent<{ fieldId: string; date: string }>()
export const dateTimeSelected = createEvent<{ fieldId: string; dateTime: string }>()
export const standardPriceChanged = createEvent<{ fieldId: string; price: number }>()
export const vipPriceChanged = createEvent<{ fieldId: string; price: number }>()
export const movieReseted = createEvent()
const resetForm = createEvent()
const reset = createEvent()
export const submitButtonClicked = createEvent()

export const $search = restore(searchChanged, '')

const fetchMoviesFx = attach({
  effect: request.fetchMoviesRequestFx,
  source: $search,
  mapParams: (_: void, title) => ({ title }),
})
const fetchHallsFx = attach({
  source: session.model.$selectedCinema,
  effect: (cId) => {
    if (!cId) throw Error('Cinema id is not defined')

    return request.fetchHallsRequestFx({ cId })
  },
})
const fetchHallFx = attach({
  source: session.model.$selectedCinema,
  effect: async (cId, params: { hId: number; fieldId: string }) => {
    if (!cId) throw Error('Cinema id is not defined')

    return request.fetchHallRequestFx({ cId, ...params })
  },
})
const fetchHallSeatsFx = attach({
  source: session.model.$selectedCinema,
  effect: async (cId, params: { hId: number; fieldId: string }) => {
    if (!cId) throw Error('Cinema id is not defined')

    return request.fetchHallSeatsRequestFx({ cId, ...params })
  },
})
const createSeancesFx = attach({
  source: session.model.$selectedCinema,
  mapParams: (params: Omit<types.CreateSeancesRequest, 'cId'>, cId) => {
    if (!cId) throw Error('Cinema id is not defined')
    return { ...params, cId }
  },
  effect: seance.model.createSeancesFx,
})

export const $searchResults = domain.createStore<Record<number, types.SearchMovie>>({})
export const $selectedMovie = domain.createStore<null | types.SearchMovie>(null).reset(movieReseted)
export const $formFields = domain
  .createStore<Record<string, lib.FormFields>>({
    [createOid()]: lib.formDefaultFields,
  })
  .reset([resetForm, movieReseted])
const $halls = domain.createStore<Record<number, types.Hall>>({})
export const $hallsList = $halls.map((halls) => Object.values(halls))
export const $isSearchLoading = fetchMoviesFx.pending
export const $formStatus = $selectedMovie.map((movie) => (movie ? 'createSeance' : 'searchMovie'))
export const $fieldsAmount = $formFields.map((fields) => Object.keys(fields).length)
export const $isFieldAddingAllowed = $fieldsAmount.map((length) => length < 10)
export const $isCreateLoading = createSeancesFx.pending

domain.onCreateStore((store) => store.reset([reset, routes.createSeance.opened]))

$searchResults.on(fetchMoviesFx.doneData, (_, { answer }) => normalizr(answer))
$halls.on(fetchHallsFx.doneData, (_, { answer }) => normalizr(answer.data))
$formFields
  .on(fetchHallFx.done, (fields, { params, result }) => {
    const field = fields[params.fieldId]
    if (!field) return fields

    return {
      ...fields,
      [params.fieldId]: {
        ...field,
        hallConfig: {
          ...field.hallConfig,
          formats: [...result.answer.data.formats],
        },
      },
    }
  })
  .on(fetchHallSeatsFx.done, (fields, { params, result }) => {
    const field = fields[params.fieldId]
    if (!field) return fields

    return {
      ...fields,
      [params.fieldId]: {
        ...field,
        hallConfig: {
          ...field.hallConfig,
          seats: getSeatTypesOfHall(result.answer.data),
        },
      },
    }
  })
  .on(hallSelected, (fields, { hId, fieldId }) => {
    const field = fields[fieldId]
    if (!field) return fields

    return {
      ...fields,
      [fieldId]: { ...field, hall_id: hId },
    }
  })
  .on(formatSelected, (fields, { fId, fieldId }) => {
    const field = fields[fieldId]
    if (!field) return fields

    return {
      ...fields,
      [fieldId]: { ...field, movie_format: fId },
    }
  })
  .on(dateSelected, (fields, { date, fieldId }) => {
    const field = fields[fieldId]
    if (!field) return fields

    return {
      ...fields,
      [fieldId]: { ...field, start_date: date },
    }
  })
  .on(dateTimeSelected, (fields, { dateTime, fieldId }) => {
    const field = fields[fieldId]
    if (!field) return fields

    return {
      ...fields,
      [fieldId]: { ...field, start_date_time: dateTime },
    }
  })
  .on(standardPriceChanged, (fields, { price, fieldId }) => {
    const field = fields[fieldId]
    if (!field) return fields

    return {
      ...fields,
      [fieldId]: { ...field, standard_seat_price: price },
    }
  })
  .on(vipPriceChanged, (fields, { price, fieldId }) => {
    const field = fields[fieldId]
    if (!field) return fields

    return {
      ...fields,
      [fieldId]: { ...field, vip_seat_price: price },
    }
  })

sample({
  clock: debounce({ source: searchChanged, timeout: 500 }),
  target: fetchMoviesFx,
})

sample({
  clock: movieSelected,
  source: $searchResults,
  fn: (results, movieId) => results[movieId] ?? null,
  target: $selectedMovie,
})

sample({
  clock: movieSelected,
  target: [disclosure.close, fetchHallsFx],
})

sample({
  clock: hallSelected,
  target: [fetchHallFx, fetchHallSeatsFx],
})

sample({
  clock: seanceFieldAdded,
  source: $formFields,
  filter: $isFieldAddingAllowed,
  fn: (fields) => ({ ...fields, [createOid()]: lib.formDefaultFields }),
  target: $formFields,
})

sample({
  clock: sample({
    clock: submitButtonClicked,
    source: $formFields,
    filter: $fieldsAmount.map((amount) => amount > 0),
    fn: lib.normalizeRequestBody,
  }),
  source: $selectedMovie,
  filter: Boolean,
  fn: (movie, seances) => ({ movie_id: movie.id, seances }),
  target: createSeancesFx,
})

sample({
  clock: createSeancesFx.done,
  target: [
    resetForm,
    movieReseted,
    showSuccessToastFx.prepend(() => ({ title: 'Сеансы созданы' })),
  ],
})

sample({
  clock: createSeancesFx.fail,
  target: showErrorToastFx.prepend(() => ({ title: 'Произошла ошибка' })),
})

function getSeatTypesOfHall(hallSeats: types.FetchHallSeatsRequestDone['answer']['data']) {
  const config: lib.FormFields['hallConfig']['seats'] = []

  for (const seat of hallSeats) {
    if (config.length === 2) {
      break
    }
    if (seat.is_vip && !config.includes('vip')) {
      config.push('vip')
    }
    if (!seat.is_vip && !config.includes('standart')) {
      config.push('standart')
    }
  }

  return config
}
