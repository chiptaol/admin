import { CreateHall } from '~features/create-hall'
import { setCookieRequestFx } from '~shared/api/domains'
import { Button } from '~shared/ui'

export const HomePage = () => {
  return (
    <div className="w-full h-full">
      <CreateHall />
      <Button onClick={() => setCookieRequestFx()}>setCookie</Button>
    </div>
  )
}
