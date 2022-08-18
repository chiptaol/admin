import { lazy, Suspense } from 'react'

import { PageLoader } from '~shared/ui'

const Page = lazy(() => import('./page').then((m) => ({ default: m.NotFoundPage })))

export const NotFoundPage = () => (
  <Suspense fallback={<PageLoader />}>
    <Page />
  </Suspense>
)
