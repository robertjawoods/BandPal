import { API_URL } from "@/app/config/environment"
import { Band } from "@prisma/client"
import prisma from "@/app/lib/prisma";


export default async function Page({ params }: { params: { id: string } }) {
  console.log("params", params)
    const band = await prisma.band.findFirst({
        where: {
            id: params.id
        }
    });

    if (!band) { 
      return <div>Band not found</div>
    }


    return <div>My Post: {band.name}</div>
  }