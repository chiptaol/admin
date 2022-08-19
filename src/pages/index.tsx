import { Route } from 'atomic-router-react'

import { Layout } from '~widgets/layout'
import { routes } from '~shared/routes'

import { HomePage } from './home'
import { NotFoundPage } from './not-found'
import { SignInPage } from './sign-in'
import { CreateCinemaPage } from './cinema/create'

export const Pages = () => (
  <Layout>
    <Route route={routes.home} view={HomePage} />
    <Route route={routes.cinema.create} view={CreateCinemaPage} />
    <Route route={routes.signIn} view={SignInPage} />
    <Route route={routes.notFound} view={NotFoundPage} />
  </Layout>
)
