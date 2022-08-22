import { lazy, Suspense } from 'react'

import { PageLoader } from '~shared/ui'

const Page = lazy(() => import('./page').then((m) => ({ default: m.SeancePage })))

export const SeancePage = () => (
  <Suspense fallback={<PageLoader />}>
    <Page />
  </Suspense>
)
