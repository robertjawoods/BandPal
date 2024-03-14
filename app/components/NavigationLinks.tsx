import Link from "next/link";

export function NavigationLinks() {
    return (
        <div className="flex">
            <div className="flex space-x-4 items-center">
                <Link href="/bands" className="py-3 px-2">Bands</Link>
                <Link href="/users" className="py-3 px-2">Users</Link>
                <Link href="/calendar" className="py-3 px-2">Calendar</Link>
                <Link href="/messages" className="py-3 px-2">Messages</Link>
            </div>
        </div>
    )
}