import React from 'react'
import ReactDOM from 'react-dom/client'
import dayjs from 'dayjs'
import customFormat from 'dayjs/plugin/customParseFormat'
import 'react-toastify/dist/ReactToastify.css'

import App from '~app'
import { ToastContainer } from '~shared/lib/toast'
import { appStarted } from '~shared/system'

import '~shared/assets/fonts/font.css'

dayjs.extend(customFormat)
appStarted()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
)
