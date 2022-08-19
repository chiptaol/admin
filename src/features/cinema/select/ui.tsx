import { list, variant } from '@effector/reflect'
import { useUnit } from 'effector-react'

import { CinemaListItem } from '~entities/cinema'
import { session } from '~entities/session'
import { Menu } from '~shared/ui'
import cn from 'classnames'

import * as model from './model'

type Props = {
  CreateCinemaNode: React.ReactNode
}

export const SelectCinema = (props: Props) => {
  return (
    <Menu.Wrapper>
      <ButtonContent />
      <Menu.Items className="w-56">
        {props.CreateCinemaNode}
        <CinemasList />
      </Menu.Items>
    </Menu.Wrapper>
  )
}

const CinemaNotSelected = () => {
  return (
    <Menu.Button withIcon className="items-center w-full ">
      <div className="flex items-center">
        <div className="mr-3 text-left mobileMax:mr-1">
          <p className="text-lg font-medium text-white">Выберите кинотеатр</p>
        </div>
      </div>
    </Menu.Button>
  )
}

const CinemaAlreadySelected = () => {
  const cinema = useUnit(model.$cinema)!

  return (
    <Menu.Button withIcon className="w-full">
      <div className="flex items-center">
        <p className="text-lg font-medium text-white">{cinema.title}</p>
      </div>
    </Menu.Button>
  )
}

const ButtonContent = variant({
  source: model.$cinema.map((cinema) => (cinema ? 'cinema' : 'selectCinema')),
  cases: {
    cinema: CinemaAlreadySelected,
    selectCinema: CinemaNotSelected,
  },
})

const CinemasList = list({
  view: (props: { cId: number; selecteCId: number | null }) => (
    <Menu.Item key={props.cId}>
      <div className={cn('w-full', { 'bg-blue-500 text-white': props.cId === props.selecteCId })}>
        <CinemaListItem onClick={() => model.cinemaSelected(props.cId)} cinemaId={props.cId} />
      </div>
    </Menu.Item>
  ),
  source: model.$cinemasList,
  bind: {
    selecteCId: session.model.$selectedCinema,
  },
  mapItem: {
    cId: (cId) => cId,
  },
  getKey: (cId) => cId,
})
