import { routes } from '~shared/routes'

const currentRoute = routes.signIn

currentRoute.opened.watch(() => 'sign in page opened')
