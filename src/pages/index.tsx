import { Route } from 'atomic-router-react'

import { routes } from '~shared/routes'

import { HomePage } from './home'

export const Pages = () => (
  <>
    <Route route={routes.home} view={HomePage} />
  </>
)

export const routesMap = [
  {
    path: '/',
    route: routes.home,
  },
]
