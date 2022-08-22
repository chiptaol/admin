import { lazy, Suspense } from 'react'

import { PageLoader } from '~shared/ui'

const Page = lazy(() => import('./page').then((m) => ({ default: m.CreateSeancePage })))

export const CreateSeancePage = () => (
  <Suspense fallback={<PageLoader />}>
    <Page />
  </Suspense>
)
