import { useStoreMap } from 'effector-react'
import { FaCrown } from 'react-icons/fa'

import * as model from '../model'

type Props = {
  id: number
}

export const HallListItem = (props: Props) => {
  const hall = useStoreMap({
    store: model.$halls,
    defaultValue: null,
    keys: [props.id],
    fn: (halls, [id]) => halls[id],
  })

  if (!hall) return null

  return (
    <div className="w-full flex items-center justify-between px-5 py-3.5 rounded border border-gray-200 bg-white shadow-md">
      <h3 className="text-base font-medium">{hall.title}</h3>
      {hall.is_vip && <FaCrown className="w-7 h-7 fill-yellow-500" />}
    </div>
  )
}
