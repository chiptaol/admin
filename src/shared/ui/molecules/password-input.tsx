import { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

import { IconButton, Input } from '../atoms'

type Props = import('../atoms/input').InputProps

export const PasswordInput = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="relative">
      <Input {...props} type={showPassword ? 'text' : 'password'} className="pr-10 w-full" />
      <IconButton
        className="absolute right-2 top-2 p-2 hover:bg-slate-300"
        aria-label="toggle-password-mask"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <AiFillEyeInvisible className="fill-blue-700" />
        ) : (
          <AiFillEye className="fill-blue-700" />
        )}
      </IconButton>
    </div>
  )
}
