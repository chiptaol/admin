import { createEvent, sample } from 'effector'
import { delay } from 'patronum'

import { cinema } from '~entities/cinema'
import { session } from '~entities/session'
import { showErrorToastFx, showSuccessToastFx } from '~shared/lib/toast'
import { Button } from '~shared/ui'

const deleteButtonClicked = createEvent()

sample({
  clock: deleteButtonClicked,
  source: session.model.$selectedCinema,
  filter: Boolean,
  fn: (id) => ({ id }),
  target: cinema.model.deleteCinemaFx,
})

sample({
  clock: cinema.model.deleteCinemaFx.done,
  target: showSuccessToastFx.prepend(() => ({ title: 'Кинотеатр удален' })),
})

sample({
  clock: cinema.model.deleteCinemaFx.fail,
  target: showErrorToastFx.prepend(() => ({ title: 'Произошла ошибка' })),
})

sample({
  clock: delay({ source: cinema.model.deleteCinemaFx.done, timeout: 1000 }),
  source: cinema.model.$cinemas.map((cinemas) => Object.values(cinemas)[0]),
  filter: Boolean,
  fn: (cinema) => cinema.id,
  target: session.model.cinemaSelected,
})

export const DeleteCinema = () => {
  return (
    <Button
      onClick={() => deleteButtonClicked()}
      theme="danger"
      variant="outline"
      className="w-full"
    >
      Удалить
    </Button>
  )
}
