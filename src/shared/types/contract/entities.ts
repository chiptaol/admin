import * as typed from 'typed-contracts'

export const user = typed.obj({
  email: typed.string,
})

export const cinema = typed.obj({
  id: typed.number,
  title: typed.string,
  address: typed.str,
  reference_point: typed.str.maybe,
  longitude: typed.str,
  latitude: typed.str,
  phone: typed.string,

  //TODO: logo can not be nullable
  logo: typed.obj({
    id: typed.str,
    path: typed.str,
  }).maybe,
})

export const format = typed.obj({
  id: typed.number,
  title: typed.str,
})

export const hall = typed.obj({
  id: typed.num,
  title: typed.string,
  is_vip: typed.bool,
  description: typed.str.maybe,
  formats: typed.arr(format),
})

export const seat = typed.obj({
  id: typed.num,
  is_vip: typed.bool,
  row: typed.num,
  place: typed.num,
  x: typed.num,
  y: typed.num,
})

export const movie = typed.obj({
  id: typed.num,
  title: typed.str.maybe,
  poster_path: typed.str.maybe,
  genres: typed.arr(typed.str).maybe,
})

export const seance = typed.obj({
  id: typed.num,
  format,
  start_date_time: typed.str,
  prices: typed.obj({
    vip: typed.num.maybe,
    standard: typed.num.maybe,
  }),
  hall: typed.obj({
    title: typed.str,
  }),
  movie,
})
