import prisma from "@/app/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function User({ params }: { params: { id: string } }) {
    const user = await prisma.user.findFirst({
        where: {
            id: params.id
        },
        include: {
            bands: true,
        }
    });

    return (
        <>
            <h1>{user?.name}</h1>
            {user?.image && <Image src={user?.image} alt={user?.name ?? ''} width={200} height={200} />}
            <h2>Bands</h2>
            <ul>
                {user?.bands.map(band => (
                    <li key={band.id}>
                        <Link href={`/band/${band.id}`}>{band.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}