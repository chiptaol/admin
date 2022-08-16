import { lazy, Suspense } from 'react'

import { PageLoader } from '~shared/ui'

const Page = lazy(() => import('./page').then((m) => ({ default: m.SignInPage })))

export const SignInPage = () => (
  <Suspense fallback={<PageLoader />}>
    <Page />
  </Suspense>
)

export * as signInPageModel from './model'
