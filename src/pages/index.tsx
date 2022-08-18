import { Route } from 'atomic-router-react'

import { Layout } from '~widgets/layout'
import { routes } from '~shared/routes'

import { HomePage } from './home'
import { NotFoundPage } from './not-found'
import { SignInPage } from './sign-in'

export const Pages = () => (
  <Layout>
    <Route route={routes.home} view={HomePage} />
    <Route route={routes.signIn} view={SignInPage} />
    <Route route={routes.notFound} view={NotFoundPage} />
  </Layout>
)
