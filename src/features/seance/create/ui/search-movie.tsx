import { useList, useStore, useUnit } from 'effector-react'
import useOutsideClickRef from '@rooks/use-outside-click-ref'
import { GoChevronRight } from 'react-icons/go'
import cn from 'classnames'
import dayjs from 'dayjs'

import { IconButton, Input, Row, Spinner } from '~shared/ui'

import * as model from '../model'
import { types } from '~shared/types'
import { IoClose } from 'react-icons/io5'

type Props = {
  isInvalid?: boolean
}

export const SearchMovie = (props: Props) => {
  const [ref] = useOutsideClickRef(() => model.disclosure.close())

  return (
    <div className="max-w-md w-full relative" ref={ref}>
      <Input
        className="w-full"
        isInvalid={props.isInvalid}
        value={useUnit(model.$search)}
        onChange={(e) => model.searchChanged(e.currentTarget.value)}
        onClick={() => model.disclosure.open()}
        placeholder="Введите название фильма"
      />
      <Options />
    </div>
  )
}

const Options = () => {
  const [isOpen, isLoading] = useUnit([model.disclosure.$isOpen, model.$isSearchLoading])
  const movies = useList(
    model.$searchResults.map((results) => Object.values(results)),
    {
      fn: (movie) => <Option key={movie.id} movie={movie} />,
      placeholder: (
        <h2 className="text-base font-semibold text-center py-5">По поиску ничего не найдено</h2>
      ),
    }
  )

  if (!isOpen) return null

  return (
    <div className="absolute inset-x-0 max-h-60 bg-white shadow-md top-[50px] rounded z-10 overflow-auto overflow-x-auto text-left">
      {isLoading ? <Loader /> : movies}
    </div>
  )
}

const Option = ({ movie }: { movie: types.SearchMovie }) => {
  return (
    <button
      type="button"
      onClick={() => model.movieSelected(movie.id)}
      className="w-full flex items-center space-x-2 text-body-long-medium-02 px-4 py-2 text-left  hover:bg-slate-100 transition-colors"
    >
      <p>
        <span className="text-white px-1 py-[2px] rounded-[2px] bg-blue-500 mr-2">
          {dayjs(movie.release_date).format('DD.MM.YYYY')}
        </span>
        {movie.title}
      </p>
    </button>
  )
}

const Loader = () => (
  <div className="w-full h-full py-5 flex items-center justify-center">
    <Spinner />
  </div>
)

export const SelectedMovie = () => {
  const movie = useUnit(model.$selectedMovie)

  if (!movie) return null

  return (
    <Row
      label="Выбранный фильм"
      className="max-w-sm w-full"
      title={`${movie.title} - ${dayjs(movie.release_date).format('DD.MM.YYYY')}`}
      EndAdornment={
        <IconButton
          className="p-1.5 hover:bg-blue-50 transition-colors"
          onClick={() => model.movieReseted()}
          aria-label="remove movie"
        >
          <IoClose />
        </IconButton>
      }
    />
  )
}
