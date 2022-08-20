import { Link } from 'atomic-router-react'
import { VscMenu } from 'react-icons/vsc'

import { routes } from '~shared/routes'

import { IconButton, Logo } from '../atoms'

type Props = {
  EndAdornment?: React.ReactNode
  StartAdornment: React.ReactNode
  onMenuButtonClick: () => void
}

export const Header = (props: Props) => {
  return (
    <div className="h-16 w-full bg-blue-900">
      <div className="flex items-center justify-between h-full max-w-screen-2xl w-full px-6 mx-auto">
        <div className="flex items-center">
          <IconButton
            className="mr-2 text-white p-2 transition-colors hover:bg-blue-700"
            aria-label="Menu Button"
            onClick={props.onMenuButtonClick}
          >
            <VscMenu className="!w-6 !h-6" />
          </IconButton>
          <hr className="w-[0.5px] h-5 mx-5 bg-white" />
          <Link to={routes.home}>
            <Logo />
          </Link>
          <hr className="w-[0.5px] h-5 mx-5 bg-white" />
          {props.StartAdornment}
        </div>
        {props.EndAdornment}
      </div>
    </div>
  )
}
