import { CreateOrEditCinema } from '~features/cinema'
import { PageContainer } from '~shared/ui'

export const CreateCinemaPage = () => {
  return (
    <PageContainer>
      <CreateOrEditCinema.Form />
    </PageContainer>
  )
}
