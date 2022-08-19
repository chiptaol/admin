import { LogoIcon } from '~shared/assets'

type Props = {
  className?: string
}

export const Logo = ({ className = '' }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <LogoIcon />
      <h1 className={`text-lg font-medium text-white ${className}`}>Admin</h1>
    </div>
  )
}
