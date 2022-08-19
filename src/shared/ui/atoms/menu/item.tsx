import { Menu } from '@headlessui/react'

type Props = {
  className?: string
  children: React.ReactNode
}

const Item = (props: Props) => {
  const { children, className = '' } = props
  return (
    <div className={className}>
      <Menu.Item>{children}</Menu.Item>
    </div>
  )
}

export { Item }
