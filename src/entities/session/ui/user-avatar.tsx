import { useUnit } from 'effector-react'

import { Avatar } from '~shared/ui'

import * as model from '../model'

export const UserAvatar = () => {
  const session = useUnit(model.$session)

  if (!session) return null

  return <Avatar name={session.email} />
}
