import prisma from "@/app/lib/prisma";

export async function GET() {
   try {
       const roles = await prisma?.role.findMany();

       return Response.json(roles, { status: 200 })
   } catch (error) {
       console.error("Failed to fetch roles:", error);
       return Response.json({ error: "Failed to fetch roles" }, { status: 500 });
   }
}