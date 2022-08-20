import { lazy, Suspense } from 'react'

import { PageLoader } from '~shared/ui'

import './model'
import './hall'

const Page = lazy(() => import('./page').then((m) => ({ default: m.HallsPage })))

export const HallsPage = () => (
  <Suspense fallback={<PageLoader />}>
    <Page />
  </Suspense>
)
