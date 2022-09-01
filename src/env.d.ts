/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_SERVER_ENDPOINT: string
  readonly VITE_APP_SERVER_BASE_ENDPOINT: string
  readonly VITE_APP_CLIENT_URL: string
  readonly VITE_APP_CLIENT_REVALIDATION_SECRET: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
