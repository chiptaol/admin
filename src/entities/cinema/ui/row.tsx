import { useStoreMap } from 'effector-react'

import * as model from '../model'

type Props = {
  cinemaId: number
}

export const CinemaRow = (props: Props) => {
  const cinema = useStoreMap({
    store: model.$cinemas,
    keys: [props.cinemaId],
    defaultValue: null,
    fn: (cinemas, [cId]) => cinemas[cId],
  })

  if (!cinema) return null

  return <div className="flex"></div>
}
