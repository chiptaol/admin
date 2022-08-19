import compose from 'compose-function'

import { withAtomicRouter } from './with-atomic-router'
import { withMaps } from './withMaps'

export const withProviders = compose(withAtomicRouter, withMaps)
