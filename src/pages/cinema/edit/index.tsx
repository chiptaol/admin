import { lazy, Suspense } from 'react'

import { PageLoader } from '~shared/ui'

import './model'

const Page = lazy(() => import('./page').then((m) => ({ default: m.EditCinemaPage })))

export const EditCinemaPage = () => (
  <Suspense fallback={<PageLoader />}>
    <Page />
  </Suspense>
)
