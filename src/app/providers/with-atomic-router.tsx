import { RouterProvider } from 'atomic-router-react'
import { createHistoryRouter } from 'atomic-router'
import { createBrowserHistory } from 'history'

import { routesMap } from '~pages'

const router = createHistoryRouter({
  routes: routesMap,
})

const history = createBrowserHistory()
router.setHistory(history)

export const withAtomicRouter = (component: () => React.ReactNode) => () => {
  return <RouterProvider router={router}>{component()}</RouterProvider>
}
