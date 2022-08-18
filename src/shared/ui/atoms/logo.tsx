import { LogoIcon } from '~shared/assets'

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <LogoIcon />
      <h1 className="text-lg font-medium text-white">Admin</h1>
    </div>
  )
}
