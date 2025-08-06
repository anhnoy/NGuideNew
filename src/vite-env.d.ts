/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_SOCKET_URL: string
  readonly VITE_GOOGLE_MAPS_API_KEY: string
  readonly VITE_GOOGLE_ANALYTICS_ID: string
  readonly VITE_KAKAO_APP_KEY: string
  readonly VITE_NODE_ENV: string
  readonly VITE_APP_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
