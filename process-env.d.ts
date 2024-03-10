declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            POSTGRES_PRISMA_URL: string
            AUTH_SECRET: string
            GOOGLE_CLIENT_ID: string
            GOOGLE_CLIENT_SECRET: string
            POSTGRES_PASSWORD: string
            NEXT_PUBLIC_BACKEND_URL: string
        }
    }
}

export {}