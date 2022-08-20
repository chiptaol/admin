import {
  GeolocationControl,
  Map as YandexMap,
  Placemark,
  SearchControl,
} from '@pbe/react-yandex-maps'

type Props = {
  onLocationSelected: (coords: [number, number]) => void
  location: number[]
  geometry: number[] | null
}

export const Map = (props: Props) => {
  return (
    <YandexMap
      width="300px"
      height="300px"
      onClick={(e: any) => props.onLocationSelected(e.get('coords') as [number, number])}
      state={{ center: props.location, zoom: 15 }}
    >
      <SearchControl
        options={{
          float: 'right',
          provider: 'yandex#search',
        }}
      />
      <GeolocationControl />
      {props.geometry && <Placemark geometry={props.geometry} />}
    </YandexMap>
  )
}
