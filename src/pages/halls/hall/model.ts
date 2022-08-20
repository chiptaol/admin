import { combine } from 'effector'

import { hall } from '~entities/hall'
import { routes } from '~shared/routes'

const currentRoute = routes.hall.current

export const $hall = combine(
  currentRoute.$params,
  hall.model.$halls,
  (params, halls) => halls[params.hId] ?? null
)
