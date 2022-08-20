/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_SERVER_ENDPOINT: string
  readonly VITE_APP_SERVER_BASE_ENDPOINT: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
