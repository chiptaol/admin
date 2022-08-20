import { createEffect } from 'effector'
import { ToastContainer as Container, toast, ToastOptions } from 'react-toastify'

type Option = {
  title: string
  option?: ToastOptions
}

export const showToastFx = createEffect({
  handler({ title, option }: Option) {
    toast(title, option)
  },
})

export const showSuccessToastFx = createEffect({
  handler({ title, option }: Option) {
    toast.success(title, option)
  },
})

export const showErrorToastFx = createEffect({
  handler({ title, option }: Option) {
    toast.error(title, option)
  },
})

export const ToastContainer = () => {
  return (
    <Container
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}
