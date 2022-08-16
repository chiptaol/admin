import { Spinner } from '../atoms'

type Props = {
  className?: string
}

export const PageLoader = ({ className = '' }: Props) => {
  return (
    <div className={`w-full h-full flex justify-center items-center ${className}`}>
      <Spinner />
    </div>
  )
}
