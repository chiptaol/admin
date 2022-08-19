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
