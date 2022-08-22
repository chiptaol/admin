import { lazy, Suspense } from 'react'

import { PageLoader } from '~shared/ui'

import './model'

const Page = lazy(() => import('./page').then((m) => ({ default: m.SeancesPage })))

export const SeancesPage = () => (
  <Suspense fallback={<PageLoader />}>
    <Page />
  </Suspense>
)
