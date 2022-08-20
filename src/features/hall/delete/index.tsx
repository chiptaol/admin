import { attach, createEvent, sample } from 'effector'
import { useUnit } from 'effector-react'

import { hall } from '~entities/hall'
import { session } from '~entities/session'
import { showErrorToastFx, showSuccessToastFx } from '~shared/lib/toast'
import { routes } from '~shared/routes'
import { Button } from '~shared/ui'

const deleteButtonClicked = createEvent()

const deleteHallFx = attach({
  effect: hall.model.deleteHallFx,
  source: {
    cId: session.model.$selectedCinema,
    hId: routes.hall.current.$params.map(({ hId }) => hId),
  },
  mapParams: (_: void, { cId, hId }) => {
    if (!cId) throw Error('Cinema id is not defined')

    return {
      cId,
      hId,
    }
  },
})

const $isLoading = deleteHallFx.pending

sample({
  clock: deleteButtonClicked,
  target: deleteHallFx,
})

sample({
  clock: deleteHallFx.done,
  target: [
    showSuccessToastFx.prepend(() => ({ title: 'Удалено' })),
    routes.halls.open.prepend(() => ({})),
  ],
})

sample({
  clock: deleteHallFx.fail,
  target: showErrorToastFx.prepend(() => ({ title: 'Произошла ошибка' })),
})

export const DeleteHall = () => {
  return (
    <Button
      isLoading={useUnit($isLoading)}
      onClick={() => deleteButtonClicked()}
      className="w-full"
      theme="danger"
      variant="outline"
    >
      Удалить
    </Button>
  )
}
