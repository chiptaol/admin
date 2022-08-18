import { session } from '~entities/session'
import { routes } from '~shared/routes'

const currentRoute = routes.home
export const sessionCheckedRoute = session.model.authorizedRoute(currentRoute)
