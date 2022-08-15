import { routes } from '~shared/routes'

const currentRoute = routes.home

currentRoute.opened.watch(() => console.log('home route opened'))
