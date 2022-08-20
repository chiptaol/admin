import { Link } from 'atomic-router-react'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { MdChair } from 'react-icons/md'
import { RiMovie2Fill } from 'react-icons/ri'

import { router, routes } from '~shared/routes'

const navigation = [
  {
    route: routes.home,
    icon: RiMovie2Fill,
    title: 'Кинотеатр',
    path: '/',
  },
  {
    route: routes.halls,
    icon: MdChair,
    title: 'Залы',
    path: '/halls',
  },
]

const NavigationWithoutTitles = () => {
  const path = useUnit(router.$path)
  return (
    <div>
      {navigation.map((route) => (
        <Link
          key={route.title}
          to={route.route}
          className={cn(
            'flex justify-center items-center hover:bg-blue-700 py-4 transition-all w-full h-full rounded-none',
            {
              'bg-blue-700': path === route.path,
            }
          )}
        >
          <route.icon className="fill-white" />
        </Link>
      ))}
    </div>
  )
}

type Props = {
  /**
   * handler that triggers on click on the navigation link
   */
  onClick(): void
}

const NavigationWithTitles = ({ onClick }: Props) => {
  const path = useUnit(router.$path)

  return (
    <div className="bg-inherit">
      {navigation.map((route) => (
        <Link
          className={cn(
            'w-full flex items-center h-12 p-4 hover:bg-blue-700 transition-colors text-white text-body-long-medium-02',
            {
              'bg-blue-700': path === route.path,
            }
          )}
          to={route.route}
          key={route.title}
          onClick={onClick}
        >
          <route.icon className="mr-4 fill-white" />
          {route.title}
        </Link>
      ))}
    </div>
  )
}

export const Navigation = {
  Fit: NavigationWithoutTitles,
  Full: NavigationWithTitles,
}
