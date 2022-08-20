import { session } from '~entities/session'
import { routes } from '~shared/routes'

const currentRoute = session.model.authorizedRoute(routes.cinema.create)
