import { lazy, Suspense } from 'react'

import { PageLoader } from '~shared/ui'

const Page = lazy(() => import('./page').then((m) => ({ default: m.HomePage })))

export const HomePage = () => (
  <Suspense fallback={<PageLoader />}>
    <Page />
  </Suspense>
)

export * as homePageModel from './model'
