import { variant } from '@effector/reflect'
import { Link } from 'atomic-router-react'

import { Button } from '~shared/ui'
import { routes } from '~shared/routes'

import * as model from '../model'
import { Form } from './create-form'
import { SearchMovie, SelectedMovie } from './search-movie'

export const CreateSeance = () => {
  return (
    <div className="w-full h-full flex flex-col space-y-5 p-5 overflow-auto">
      <div className="flex w-full justify-between">
        <h1 className="text-xl font-semibold">Создание сеанса</h1>
        <Link to={routes.seances}>
          <Button variant="outline">Назад</Button>
        </Link>
      </div>
      <FormContent />
    </div>
  )
}

const FormContent = variant({
  source: model.$formStatus,
  cases: {
    searchMovie: SearchMovie,
    createSeance: () => (
      <div className="flex flex-col space-y-2">
        <SelectedMovie />
        <Form />
      </div>
    ),
  },
})
