import { CgClose } from 'react-icons/cg'

import { Drawer, Navigation } from '../molecules'
import { IconButton, Logo } from '../atoms'

type Props = {
  isOpen: boolean
  onClose(): void
}

export const Sidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <div className="h-full min-w-[48px] w-max bg-blue-800 sticky top-0">
        <Navigation.Fit />
      </div>
      <Drawer
        transparentOverlay
        className="!bg-blue-800 p-[0px] !max-w-xs"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex h-full flex-col">
          <div className="py-3 px-4 flex items-center justify-between h-12">
            <h1 className="text-lg font-semibold text-white">Меню</h1>
            <IconButton
              onClick={onClose}
              aria-label="close"
              className="p-1.5 transition-colors hover:bg-blue-900"
              type="button"
            >
              <CgClose className="h-7 w-7 text-white" />
            </IconButton>
          </div>
          <div className="h-full pt-8">
            <Navigation.Full onClick={onClose} />
          </div>
        </div>
      </Drawer>
    </>
  )
}
