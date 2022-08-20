import { RouterProvider } from 'atomic-router-react'

import { router } from '~shared/routes'

export const withAtomicRouter = (component: () => React.ReactNode) => () => {
  return <RouterProvider router={router}>{component()}</RouterProvider>
}
