declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            AUTH_SECRET: string
            GOOGLE_CLIENT_ID: string
            GOOGLE_CLIENT_SECRET: string
            NEXT_PUBLIC_BACKEND_URL: string
            DIRECT_DATABASE_URL: string
            DATABASE_URL: string
            SUPABASE_API_KEY: string
            NEXT_PUBLIC_SUPABASE_URL: string
            NEXT_PUBLIC_SUPABASE_ANON_KEY: string
        }
    }
}

export { }