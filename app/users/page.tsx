import { User } from "@prisma/client";
import Link from "next/link";
import prisma from "@/app/lib/prisma";

export const revalidate = 3

export default async function Users() {

    const users: User[] = await prisma.user.findMany();

    return (
        <div className="flex items-center flex-col">
            <h1 className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link href={`/user/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </div>

    )
}