import { Route } from 'atomic-router-react'

import { routes } from '~shared/routes'

import { HomePage } from './home'
import { SignInPage } from './sign-in'

export const Pages = () => (
  <>
    <Route route={routes.home} view={HomePage} />
    <Route route={routes.signIn} view={SignInPage} />
  </>
)

export const routesMap = [
  {
    path: '/',
    route: routes.home,
  },
  {
    path: '/sign-in',
    route: routes.signIn,
  },
]
