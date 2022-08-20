import { useStoreMap, useUnit } from 'effector-react'

import { SignOut } from '~features/auth'
import { CreateOrEditCinema, SelectCinema } from '~features/cinema'
import { session, UserAvatar } from '~entities/session'
import { createDisclosure } from '~shared/lib/disclosure'
import { router } from '~shared/routes'
import { Header, Menu, Sidebar } from '~shared/ui'

type Props = {
  children: React.ReactNode
}

const $isSignInPage = router.$path.map((path) => path.includes('sign-in'))
const disclosure = createDisclosure()

export const Layout = (props: Props) => {
  const isSignInPage = useUnit($isSignInPage)

  if (isSignInPage) return <>{props.children}</>

  return (
    <div className="w-full h-full flex flex-col">
      <Header
        onMenuButtonClick={disclosure.open}
        StartAdornment={<SelectCinema CreateCinemaNode={<CreateOrEditCinema.Button />} />}
        EndAdornment={<UserMenu />}
      />
      <div className="flex-grow overflow-y-auto flex relative">
        <LayoutSidebar />
        {props.children}
      </div>
    </div>
  )
}

const LayoutSidebar = () => {
  const isOpen = useUnit(disclosure.$isOpen)
  return <Sidebar isOpen={isOpen} onClose={disclosure.close} />
}

const UserMenu = () => {
  const userEmail = useStoreMap(session.model.$session, (session) => session?.email ?? null)
  return (
    <Menu.Wrapper>
      <Menu.Button className="items-center w-full mobileMax:px-1.5">
        <UserAvatar />
      </Menu.Button>
      <Menu.Items className="w-56">
        <p className="text-base font-medium text-black px-2 py-1.5">{userEmail}</p>
        <Menu.Item>
          <div className="w-full py-1 px-3 hover:bg-blue-500 hover:text-white transition-all">
            <SignOut />
          </div>
        </Menu.Item>
      </Menu.Items>
    </Menu.Wrapper>
  )
}
