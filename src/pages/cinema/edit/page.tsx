import { CreateOrEditCinema } from '~features/cinema'
import { PageContainer } from '~shared/ui'

export const EditCinemaPage = () => {
  return (
    <PageContainer>
      <CreateOrEditCinema.Form />
    </PageContainer>
  )
}
