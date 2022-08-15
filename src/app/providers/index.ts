import compose from 'compose-function'

import { withAtomicRouter } from './with-atomic-router'

export const withProviders = compose(withAtomicRouter)
