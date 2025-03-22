'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'


export default function ErrorPage() {
    return (
        <Suspense fallback={<div>Error...</div>}>
            <Error />
        </Suspense>
    )
}

function Error() {
    const searchParams = useSearchParams()
    const message = searchParams.get('message')

    return (
        <div>
            <h1>Error</h1>
            <p>{message ?? 'Something went wrong.'}</p>
        </div>
    )
}