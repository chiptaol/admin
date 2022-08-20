import { useEffect, useState } from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { IoImages } from 'react-icons/io5'

type Props = {
  path: string | null
  onDeleteClicked: () => void
  onLogoUploaded: (file: File) => void
}

export const UploadLogo = (props: Props) => {
  const [error, setError] = useState(false)

  useEffect(() => {
    if (props.path !== null) setError(false)
  }, [props.path])

  if (error || props.path === null) {
    return <UploadButton onLogoUploaded={props.onLogoUploaded} />
  }

  return (
    <ImageContainter
      onDeleteClicked={props.onDeleteClicked}
      path={props.path}
      onError={() => setError(true)}
    />
  )
}

const UploadButton = (props: Pick<Props, 'onLogoUploaded'>) => {
  return (
    <div className="flex justify-center items-center w-[150px] h-[150px] flex-shrink-0 relative rounded-md border border-gray-200 shadow-md">
      <input
        type="file"
        onChange={(e) => {
          const file = onChange(e)
          if (file) props.onLogoUploaded(file)
        }}
        className="absolute inset-0 opacity-0 cursor-pointer "
      />
      <IoImages className="h-7 w-7 fill-blue-500" />
    </div>
  )
}

const ImageContainter = ({
  onError,
  path,
  onDeleteClicked,
}: Pick<Props, 'onDeleteClicked'> & { onError: () => void; path: string }) => {
  return (
    <div className="flex justify-center items-center !w-[150px] h-[150px] flex-shrink-0 cursor-pointer rounded-md border border-gray-200 shadow-md relative overflow-hidden">
      <button
        type="button"
        className="absolute bg-transparent z-10 top-0 left-0 w-full h-full hover:bg-[rgba(0,0,0,0.5)] hover:opacity-100 transition-colors flex items-center justify-center opacity-0"
        onClick={onDeleteClicked}
      >
        <BsTrashFill className="h-[15%] w-[15%] fill-white" />
      </button>
      <img className="object-contain !w-[150px] h-[150px]" onError={onError} src={path} />
    </div>
  )
}

function onChange(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0]
  if (!file) return

  return file
}
