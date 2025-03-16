import prisma from "@/app/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function User(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
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
            <Link href={`/user/edit/${user?.id}`}>Edit</Link>
            {user?.image && <Image src={user?.image} alt={user?.name ?? ''} width={200} height={200} className="rounded-full" />}
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