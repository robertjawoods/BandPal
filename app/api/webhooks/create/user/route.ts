export const dynamic = 'force-dynamic' // defaults to auto

import algoliasearch from "algoliasearch"
import { NextResponse } from "next/server"

const client = algoliasearch(process.env.ALGOLIA_APP_ID ?? 'QMURIJHZEO', process.env.ALGOLIA_API_KEY || '40e2b5f285436f153868b1ccf580ea11')
const index = client.initIndex('users')

export async function POST(request: Request, response: Response) {
    const user = await request.json()
    console.log(user)

    const object = {
        objectID: user.id,
        name: user.name,
        email: user.email,
    }

    try {
        await index.saveObject(object)

        console.log("User has been indexed", object)

        return Response.json({}, { status: 200 })
    } catch (error) {
        console.error(`An error occurred while indexing user:`, error)

        return Response.json({ error }, { status: 500 })
    }

}