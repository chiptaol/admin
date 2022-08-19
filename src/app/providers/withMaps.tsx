import { YMaps } from '@pbe/react-yandex-maps'

export const withMaps = (component: () => React.ReactNode) => () => {
  return <YMaps>{component()}</YMaps>
}
