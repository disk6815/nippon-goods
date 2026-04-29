declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    PRINTFUL_API_KEY: string
    PRINTFUL_STORE_ID: string
    STRIPE_SECRET_KEY: string
    STRIPE_WEBHOOK_SECRET: string
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
    DISCORD_WEBHOOK_URL: string
    NEXT_PUBLIC_APP_URL: string
    ADMIN_USERNAME: string
    ADMIN_PASSWORD: string
  }
}
