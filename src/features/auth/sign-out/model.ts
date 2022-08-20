import { createEvent, sample } from 'effector'
import { session } from '~entities/session'

export const signOutButtonClicked = createEvent()

sample({
  clock: signOutButtonClicked,
  target: session.model.signOutFx,
})
