import { lazy } from 'react'

export const HomePage = lazy(() => import('./page').then((m) => ({ default: m.HomePage })))

export * as homePageModel from './model'
