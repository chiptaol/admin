import { Route } from 'atomic-router-react'

import { Layout } from '~widgets/layout'
import { routes } from '~shared/routes'

import { HomePage } from './home'
import { NotFoundPage } from './not-found'
import { SignInPage } from './sign-in'
import { CreateCinemaPage } from './cinema/create'
import { EditCinemaPage } from './cinema/edit'
import { HallsPage } from './halls'
import { HallSeatsPage } from './halls/seats'

export const Pages = () => (
  <Layout>
    <Route route={routes.home} view={HomePage} />
    <Route route={routes.cinema.create} view={CreateCinemaPage} />
    <Route route={routes.cinema.edit} view={EditCinemaPage} />
    <Route route={routes.halls} view={HallsPage} />
    <Route route={routes.hall.seats} view={HallSeatsPage} />
    <Route route={routes.signIn} view={SignInPage} />
    <Route route={routes.notFound} view={NotFoundPage} />
  </Layout>
)
