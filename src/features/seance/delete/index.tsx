import { attach, createEvent, sample } from 'effector'
import { useUnit } from 'effector-react'

import { seance } from '~entities/seance'
import { session } from '~entities/session'
import { request } from '~shared/api'
import { showErrorToastFx, showSuccessToastFx } from '~shared/lib/toast'
import { routes } from '~shared/routes'
import { Button } from '~shared/ui'

const deleteClicked = createEvent()

const deleteFx = attach({
  effect: seance.model.deleteSeanceFx,
  source: session.model.$selectedCinema,
  mapParams: (sId: number, cId) => ({ sId, cId: cId! }),
})

const $isLoading = deleteFx.pending

sample({
  clock: deleteClicked,
  source: routes.seance.$params,
  fn: (params) => params.sId,
  target: deleteFx,
})

sample({
  clock: deleteFx.doneData,
  target: [
    routes.seances.open,
    showSuccessToastFx.prepend(() => ({ title: 'Удалено' })),
    request.revalidateClientRequestFx,
  ],
})

sample({
  clock: deleteFx.fail,
  target: showErrorToastFx.prepend(() => ({ title: 'Произошла ошибка' })),
})

export const DeleteSeance = () => {
  return (
    <Button
      isLoading={useUnit($isLoading)}
      onClick={() => deleteClicked()}
      theme="danger"
      variant="outline"
      className="max-w-xs w-full"
    >
      Удалить
    </Button>
  )
}
