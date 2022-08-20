import { useStoreMap } from 'effector-react'

import { CreateHallScheme } from '~features/hall'
import { hall } from '~entities/hall'
import { PageContainer } from '~shared/ui'

export const HallSeatsPage = () => {
  const hallTitle = useStoreMap(hall.model.$hall, (hall) => hall?.title ?? '-')
  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold mb-4">{hallTitle}</h1>
      <CreateHallScheme.View />
    </PageContainer>
  )
}
