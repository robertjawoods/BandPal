export const dynamic = 'force-dynamic' // defaults to auto

import prisma from "@/app/lib/prisma"

interface AddInfluenceArgs { 
    name: string;
    id: string;
    genres: string[];
    image: any[];

}


export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    if (!params.id) {
        return Response.error()
    }

    const data = await req.json() as AddInfluenceArgs;

    const user = await prisma?.user.update({
        where: {
            id: params.id,
        },
        data: {
            
            profile: {
                update: {
                    influences: {
                        connectOrCreate: {
                            where: { name: data.name, id: data.id },
                            create: data
                        }
                    }
                }
            },
        },
    });


    return Response.json(user, { status: 200 })
}   